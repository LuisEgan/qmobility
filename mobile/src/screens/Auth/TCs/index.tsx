import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Icons } from "../../../components";
import theme, { Text } from "../../../config/Theme";
import Header from "../../../components/Header";
import { AUTH_STACK_SCREENS_NAMES } from "../../../lib/constants";

const { width } = Dimensions.get("window");

const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: NativeScrollEvent) =>
  layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

const TCs = () => {
  const { navigate, goBack } = useNavigation();
  const scroll = useRef<ScrollView>(null);

  const [endScroll, setEndScroll] = useState<boolean>(false);

  const confirmTermsConditions = (): void => {
    navigate(AUTH_STACK_SCREENS_NAMES.Access);
  };

  const scrollDown = () => {
    scroll?.current?.scrollToEnd();
  };

  return (
    <View style={styles.container}>
      <Header
        title="Terms & Conditions"
        icon="ArrowBack"
        onPress={() => goBack()}
      />

      <ScrollView
        ref={scroll}
        onScroll={({
          nativeEvent,
        }: NativeSyntheticEvent<NativeScrollEvent>) => {
          if (isCloseToBottom(nativeEvent)) {
            setEndScroll(true);
          }
        }}
        style={styles.scroll}
      >
        <Text style={[styles.heading]} variant="heading1">
          END USER LICENSE AGREEMENT
        </Text>

        <Text style={[styles.heading]} variant="heading2">
          Last updated December 14, 2020
        </Text>

        <Text>
          Eve is licensed to You (End-User) by qmobility, located at 81
          Smugglers Way, Dolphin House, London, SW18 1DG, United Kingdom
          (hereinafter: Licensor), for use only under the terms of this License
          Agreement. By downloading the Application from the AppStore, and any
          update thereto (as permitted by this License Agreement), You indicate
          that You agree to be bound by all of the terms and conditions of this
          License Agreement, and that You accept this License Agreement. The
          parties of this License Agreement acknowledge that neither Google nor
          Apple are Party to this License Agreement and are not bound by any
          provisions or obligations with regard to the Application, such as
          warranty, liability, maintenance and support thereof. qmobility, not
          Apple or Google, is solely responsible for the licensed Application
          and the content thereof. This License Agreement may not provide for
          usage rules for the Application that are in conflict with the latest
          Apple or Google App Store Terms of Service. qmobility acknowledges
          that it had the opportunity to review said terms and this License
          Agreement is not conflicting with them. All rights not expressly
          granted to You are reserved.
        </Text>

        <Text style={[styles.heading]} variant="heading2">
          1. THE APPLICATION
        </Text>

        <Text>
          Eve (hereinafter: Application) is a piece of software created to
          provide guidance and assistance in choosing an Electric Car to meet
          your needs.
        </Text>

        <Text style={[styles.heading]} variant="heading2">
          2. SCOPE OF LICENSE
        </Text>

        <Text>
          2.1 You may not share or make the Application available to third
          parties (unless to the degree allowed by the Apple or Google Terms and
          Conditions, and with qmobility&apos;s prior written consent), sell,
          rent, lend, lease or otherwise redistribute the Application. 2.2 You
          may not reverse engineer, translate, disassemble, integrate,
          decompile, integrate, remove, modify, combine, create derivative works
          or updates of, adapt, or attempt to derive the source code of the
          Application, or any part thereof (except with qmobility&apos;s prior
          written consent). 2.3 You may not copy (excluding when expressly
          authorized by this license and the Usage Rules) or alter the
          Application or portions thereof. You may create and store copies only
          on devices that You own or control for backup keeping under the terms
          of this license, the App Store Terms of Service, and any other terms
          and conditions that apply to the device or software used. You may not
          remove any intellectual property notices. You acknowledge that no
          unauthorized third parties may gain access to these copies at any
          time. 2.4 Nothing in this license should be interpreted to restrict
          third-party terms. When using the Application, You must ensure that
          You comply with applicable third-party terms and conditions.
        </Text>

        <Text style={[styles.heading]} variant="heading2">
          3. TECHNICAL REQUIREMENTS
        </Text>

        <Text>The app should work on any recent Apple or Android phone. </Text>

        <Text style={[styles.heading]} variant="heading2">
          4. NO MAINTENANCE OR SUPPORT
        </Text>

        <Text>
          4.1 qmobility is not obligated, expressed or implied, to provide any
          maintenance, technical or other support for the Application. 4.2
          qmobility and the End-User acknowledge that neither Apple nor Google
          have any obligation whatsoever to furnish any maintenance and support
          services with respect to the licensed Application.
        </Text>

        <Text style={[styles.heading]} variant="heading2">
          5. USER GENERATED CONTRIBUTIONS
        </Text>

        <Text>
          The Application and/or Eve website may invite you to chat, contribute
          to, or participate in blogs, message boards, online forums, and other
          functionality, and may provide you with the opportunity to create,
          submit, post, display, transmit, perform, publish, distribute, or
          broadcast content and materials to us or in the Application, including
          but not limited to text, writings, video, audio, photographs,
          graphics, comments, suggestions, or personal information or other
          material (collectively, &quot;Contributions&quot;). Contributions may
          be viewable by other users of the Application and through third-party
          websites or applications. As such, any Contributions you transmit may
          be treated as non-confidential and non-proprietary. When you create or
          make available any Contributions, you thereby represent and warrant
          that: 1. The creation, distribution, transmission, public display, or
          performance, and the accessing, downloading, or copying of your
          Contributions do not and will not infringe the proprietary rights,
          including but not limited to the copyright, patent, trademark, trade
          secret, or moral rights of any third party. 2. You are the creator and
          owner of or have the necessary licenses, rights, consents, releases,
          and permissions to use and to authorize us, the Application, and other
          users of the Application to use your Contributions in any manner
          contemplated by the Application and these Terms of Use. 3. You have
          the written consent, release, and/or permission of each and every
          identifiable individual person in your Contributions to use the name
          or likeness or each and every such identifiable individual person to
          enable inclusion and use of your Contributions in any manner
          contemplated by the Application and these Terms of Use. 4. Your
          Contributions are not false, inaccurate, or misleading. 5. Your
          Contributions are not unsolicited or unauthorized advertising,
          promotional materials, pyramid schemes, chain letters, spam, mass
          mailings, or other forms of solicitation. 6. Your Contributions are
          not obscene, lewd, lascivious, filthy, violent, harassing, libellous,
          slanderous, or otherwise objectionable (as determined by us). 7. Your
          Contributions do not ridicule, mock, disparage, intimidate, or abuse
          anyone. 8. Your Contributions are not used to harass or threaten (in
          the legal sense of those terms) any other person and to promote
          violence against a specific person or class of people. 9. Your
          Contributions do not violate any applicable law, regulation, or rule.
          10. Your Contributions do not violate the privacy or publicity rights
          of any third party. 11. Your Contributions do not contain any material
          that solicits personal information from anyone under the age of 18 or
          exploits people under the age of 18 in a sexual or violent manner. 12.
          Your Contributions do not violate any applicable law concerning child
          pornography, or otherwise intended to protect the health or well-being
          of minors. 13. Your Contributions do not include any offensive
          comments that are connected to race, national origin, gender, sexual
          preference, or physical handicap. 14. Your Contributions do not
          otherwise violate, or link to material that violates, any provision of
          these Terms of Use, or any applicable law or regulation. Any use of
          the Application in violation of the foregoing violates these Terms of
          Use and may result in, among other things, termination, or suspension
          of your rights to use the Application.
        </Text>

        <Text style={[styles.heading]} variant="heading2">
          6. CONTRIBUTION LICENSE
        </Text>

        <Text>
          By posting your Contributions to any part of the Application or making
          Contributions accessible to the Application by linking your account
          from the Application to any of your social networking accounts, you
          automatically grant, and you represent and warrant that you have the
          right to grant, to us an unrestricted, unlimited, irrevocable,
          perpetual, non-exclusive, transferable, royalty-free, fully-paid,
          worldwide right, and license to host, use copy, reproduce, disclose,
          sell, resell, publish, broad cast, retitle, archive, store, cache,
          publicly display, reformat, translate, transmit, excerpt (in whole or
          in part), and distribute such Contributions (including, without
          limitation, your image and voice) for any purpose, commercial
          advertising, or otherwise, and to prepare derivative works of, or
          incorporate in other works, such as Contributions, and grant and
          authorize sublicenses of the foregoing. The use and distribution may
          occur in any media formats and through any media channels. This
          license will apply to any form, media, or technology now known or
          hereafter developed, and includes our use of your name, company name,
          and franchise name, as applicable, and any of the trademarks, service
          marks, trade names, logos, and personal and commercial images you
          provide. You waive all moral rights in your Contributions, and you
          warrant that moral rights have not otherwise been asserted in your
          Contributions. We do not assert any ownership over your Contributions.
          You retain full ownership of all of your Contributions and any
          intellectual property rights or other proprietary rights associated
          with your Contributions. We are not liable for any statements or
          representations in your Contributions provided by you in any area in
          the Application. You are solely responsible for your Contributions to
          the Application and you expressly agree to exonerate us from any and
          all responsibility and to refrain from any legal action against us
          regarding your Contributions. We have the right, in our sole and
          absolute discretion, (1) to edit, redact, or otherwise change any
          Contributions; (2) to re-categorize any Contributions to place them in
          more appropriate locations in the Application; and (3) to pre-screen
          or delete any Contributions at any time and for any reason, without
          notice. We have no obligation to monitor your Contributions.
        </Text>

        <Text style={[styles.heading]} variant="heading2">
          7. LIABILITY
        </Text>

        <Text>
          7.1 Licensor&apos;s responsibility in the case of violation of
          obligations and tort shall be limited to intent and gross negligence.
          Only in case of a breach of essential contractual duties (cardinal
          obligations), Licensor shall also be liable in case of slight
          negligence. In any case, liability shall be limited to the
          foreseeable, contractually typical damages. The limitation mentioned
          above does not apply to injuries to life, limb, or health. 7.2
          Licensor takes no accountability or responsibility for any damages
          caused due to a breach of duties according to Section 2 of this
          Agreement. To avoid data loss, You are required to make use of backup
          functions of the Application to the extent allowed by applicable
          third-party terms and conditions of use. You are aware that in case of
          alterations or manipulations of the Application, You will not have
          access to licensed Application.
        </Text>

        <Text style={[styles.heading]} variant="heading2">
          8. WARRANTY
        </Text>

        <Text>
          8.1 Licensor warrants that the Application is free of spyware, trojan
          horses, viruses, or any other malware at the time of Your download.
          Licensor warrants that the Application works as described in the user
          documentation. 8.2 No warranty is provided for the Application that is
          not executable on the device, that has been unauthorizedly modified,
          handled inappropriately or culpably, combined or installed with
          inappropriate hardware or software, used with inappropriate
          accessories, regardless if by Yourself or by third parties, or if
          there are any other reasons outside of qmobility&apos;s sphere of
          influence that affect the executability of the Application. 8.3 You
          are required to inspect the Application immediately after installing
          it and notify qmobility about issues discovered without delay by
          e-mail provided in Product Claims. The defect report will be taken
          into consideration and further investigated if it has been mailed
          within a period of 14 days after discovery. 8.4 If we confirm that the
          Application is defective, qmobility reserves a choice to remedy the
          situation either by means of solving the defect or substitute
          delivery. 8.5 In the event of any failure of the Application to
          conform to any applicable warranty, You may notify the
          App-Store-Operator, and Your Application purchase price will be
          refunded to You. To the maximum extent permitted by applicable law,
          the App-Store-Operator will have no other warranty obligation
          whatsoever with respect to the App, and any other losses, claims,
          damages, liabilities, expenses and costs attributable to any
          negligence to adhere to any warranty. 8.6 If the user is an
          entrepreneur, any claim based on faults expires after a statutory
          period of limitation amounting to twelve (12) months after the
          Application was made available to the user. The statutory periods of
          limitation given by law apply for users who are consumers.
        </Text>

        <Text style={[styles.heading]} variant="heading2">
          9. PRODUCT CLAIMS
        </Text>

        <Text>
          qmobility and the End-User acknowledge that qmobility, and not Apple
          or Google, is responsible for addressing any claims of the End-User or
          any third party relating to the licensed Application or the End-User’s
          possession and/or use of that licensed Application, including, but not
          limited to: (i) product liability claims; (ii) any claim that the
          licensed Application fails to conform to any applicable legal or
          regulatory requirement; and
        </Text>

        <Text style={[styles.heading]} variant="heading2">
          10. LEGAL COMPLIANCE
        </Text>

        <Text>
          You represent and warrant that You are not located in a country that
          is subject to a U.S. Government embargo, or that has been designated
          by the U.S. Government as a &quot;terrorist supporting&quot; country;
          and that You are not listed on any U.S. Government list of prohibited
          or restricted parties.
        </Text>

        <Text style={[styles.heading]} variant="heading2">
          11. CONTACT INFORMATION
        </Text>

        <Text>
          For general inquiries, complaints, questions or claims concerning the
          licensed Application, please contact: Eve Support 81 Smugglers Way,
          Dolphin House London, SW18 1DG United Kingdom info@qmobility.com
        </Text>

        <Text style={[styles.heading]} variant="heading2">
          12. TERMINATION
        </Text>

        <Text>
          The license is valid until terminated by qmobility or by You. Your
          rights under this license will terminate automatically and without
          notice from qmobility if You fail to adhere to any term(s) of this
          license. Upon License termination, You shall stop all use of the
          Application, and destroy all copies, full or partial, of the
          Application.
        </Text>

        <Text style={[styles.heading]} variant="heading2">
          13. THIRD-PARTY TERMS OF AGREEMENTS AND BENEFICIARY
        </Text>

        <Text>
          qmobility represents and warrants that qmobility will comply with
          applicable third-party terms of agreement when using licensed
          Application. In Accordance with Section 9 of the &quot;Instructions
          for Minimum Terms of Developer&apos;s End-User License
          Agreement,&quot; Apple and Apple&apos;s subsidiaries shall be
          third-party beneficiaries of this End User License Agreement and -
          upon Your acceptance of the terms and conditions of this license
          agreement, Apple will have the right (and will be deemed to have
          accepted the right) to enforce this End User License Agreement against
          You as a third-party beneficiary thereof, and similarly with regard to
          Google’s Play Store terms and conditions.
        </Text>

        <Text style={[styles.heading]} variant="heading2">
          14. INTELLECTUAL PROPERTY RIGHTS
        </Text>

        <Text>
          qmobility and the End-User acknowledge that, in the event of any
          third-party claim that the licensed Application or the End-User&apos;s
          possession and use of that licensed Application infringes on the third
          party&apos;s intellectual property rights, qmobility, and not Apple or
          Google, will be solely responsible for the investigation, defense,
          settlement and discharge or any such intellectual property
          infringement claims.
        </Text>

        <Text style={[styles.heading]} variant="heading2">
          15. APPLICABLE LAW
        </Text>

        <Text>
          This license agreement is governed by the laws of the United Kingdom.
        </Text>

        <Text style={[styles.heading]} variant="heading2">
          16. MISCELLANEOUS
        </Text>

        <Text style={{ marginBottom: 100 }}>
          16.1 If any of the terms of this agreement should be or become
          invalid, the validity of the remaining provisions shall not be
          affected. Invalid terms will be replaced by valid ones formulated in a
          way that will achieve the primary purpose. 16.2 Collateral agreements,
          changes and amendments are only valid if laid down in writing. The
          preceding clause can only be waived in writing.
        </Text>
      </ScrollView>

      {!endScroll ? (
        <TouchableOpacity style={styles.buttonContainer} onPress={scrollDown}>
          <View>
            <Text style={styles.textStyle}>
              scroll down to agree
              {"   "}
              <Icons icon="ArrowDown" size={13} />
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={{ marginBottom: 30 }}>
          <Button
            variant="primary"
            onPress={() => confirmTermsConditions()}
            label="AGREE & CONTINUE"
            containerStyle={{ marginHorizontal: "10%", width: width * 0.8 }}
          />
        </View>
      )}
    </View>
  );
};
export default TCs;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  scroll: {
    flex: 1,
    padding: 20,
    marginBottom: 20,
  },
  heading: {
    paddingVertical: 15,
  },
  textStyle: {
    fontSize: 14,
    textAlign: "center",
  },
  buttonContainer: {
    flex: 0.2,
    padding: "1%",
    backgroundColor: theme.colors.white,
    justifyContent: "center",
  },
});
