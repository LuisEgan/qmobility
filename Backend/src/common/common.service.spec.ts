import { BadRequestException, HttpModule, HttpService } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { CommonService } from './common.service';
import { SendEmailDto, Tos } from './dto/send-email.dto';
import { AxiosResponse } from 'axios';

describe('CommonService', () => {
  let commonService: CommonService;
  let httpService: HttpService;

  console.error = jest.fn();

  const mockSendEmailDto: SendEmailDto = {
    from: 'no-reploy@demo.com',
    to: [new Tos('test@test.com', 'Test')],
    subject: 'Hi From Mock',
    text: 'Text Send',
    html: '<h1>Hi From Testing!</h1>',
    templateId: 'd-sometemplate-id',
    dynamic_template_data: { someAtribute: 'someObject' },
    categories: ['test', 'test2'],
    cb: () => {},
  };

  process.env.SENDMAIL_URL = 'https://somefancyurl.com/api';
  process.env.SENDGRID_APIKEY = 'some bearer';
  process.env.AZURE_STORAGE_ACCOUNT = 'some_random_config';
  process.env.AZURE_STORAGE_KEY = 'some_random_config';
  process.env.AZURE_CONTAINER_NAME = 'some_random_config';

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CommonService],
      imports: [HttpModule],
    }).compile();

    httpService = module.get<HttpService>(HttpService);
    commonService = module.get<CommonService>(CommonService);
  });

  it('commonService should be defined', () => {
    expect(commonService).toBeDefined();
  });

  it('should send a email', async () => {
    const result: AxiosResponse = {
      data: {},
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(result));

    const response = await commonService.sendEmail(mockSendEmailDto);

    expect(response).toEqual(result);
  });

  it('should fail sending an email but the error is logged', async () => {
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => {
      throw new Error(`some fancy error message`);
    });

    await commonService.sendEmail(mockSendEmailDto);
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('should upload a file in string b64', async () => {
    const urlGenerated = await commonService.uploadFromB64(
      'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
      'some_file.txt',
      'some_path',
    );
    expect(urlGenerated).toContain('some_file.txt');
  });

  it('should throw a error because does not have the correct string format', async () => {
    expect(
      commonService.uploadFromB64('data:image', 'some_file.txt', 'some_path'),
    ).rejects.toThrow(BadRequestException);
  });
});
