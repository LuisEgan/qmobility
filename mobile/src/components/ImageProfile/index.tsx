import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import theme, { Text } from "../../config/Theme";
import Modal from "../Modal";
import { IComponentsDefaults } from "../../lib/Types";

interface IImageProfile extends IComponentsDefaults {
  label?: string;
  color?: string;
  changePhotoOption?: boolean;
  onLoadPhoto?: (photo: string) => void;
  avatarUrl?: string;
}

const ImageProfile = (props: IImageProfile) => {
  const {
    containerStyle,
    label,
    color,
    changePhotoOption,
    onLoadPhoto,
    avatarUrl,
  } = props;

  const [stateModal, setStateModal] = useState<boolean>(false);
  const [photo, setPhoto] = useState<ImageInfo>();

  // * Get camera permissions
  useEffect(() => {
    getPermissionCameraAsync();
  }, []);

  // * On update photo
  useEffect(() => {
    if (photo) {
      if (onLoadPhoto) onLoadPhoto(`data:image/jpeg;base64,${photo.base64?.toString()}`);
      setStateModal(false);
    }
  }, [photo]);

  const ModalSelect = () => (
    <Modal
      state={stateModal}
      onClosed={() => {
        setStateModal(!stateModal);
      }}
    >
      <View style={styles.modalView}>
        <TouchableOpacity onPress={searchAlbum} style={styles.modalTouch}>
          <Text variant="body">Select album</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={takePhoto} style={styles.modalTouch}>
          <Text variant="body">Take a photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setStateModal(false)}
          style={styles.modalTouch}
        >
          <Text variant="body">Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  const getPermissionCameraAsync = async () => {
    try {
      await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
    } catch (error) {
      console.error("TCL: getPermissionCameraAsync -> error", error);
    }
  };

  const loadingPhoto = (): void => {
    setStateModal(true);
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 0.2,
      base64: true,
    });

    if (result.cancelled === false) {
      setPhoto(result);
    }
  };

  const searchAlbum = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
      base64: true,
    });

    if (result.cancelled === false) {
      setPhoto(result);
    }
  };

  return (
    <>
      <ModalSelect />
      <View style={[styles.container, containerStyle]}>
        <View
          style={[
            styles.content,
            {
              backgroundColor: color,
            },
          ]}
        >
          {photo || avatarUrl ? (
            <Image
              // TODO loading img feedback
              // onLoadStart={() => console.log("start")}
              // onLoadEnd={() => console.log("end")}
              style={styles.image}
              source={{
                uri: photo
                  ? `data:image/jpeg;base64,${photo.base64?.toString()}`
                  : avatarUrl,
              }}
            />
          ) : (
            <Text style={styles.text}>{label}</Text>
          )}
        </View>

        {changePhotoOption && (
          <View style={styles.viewContent}>
            <TouchableOpacity onPress={loadingPhoto}>
              <Text style={styles.textContent}>Change Photo</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
};

ImageProfile.defaultProps = {
  changePhotoOption: true,
};

export default ImageProfile;

const styles = StyleSheet.create({
  container: {
    marginVertical: "5%",
  },
  content: {
    width: 80,
    height: 80,
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: theme.colors.secondaryLight,
  },
  viewContent: {
    marginTop: "2%",
  },
  textContent: {
    fontSize: 12,
    color: theme.colors.primary,
  },
  modalContent: {
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    height: 180,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: theme.colors.white,
  },
  modalTouch: {
    height: 50,
    justifyContent: "center",
    marginHorizontal: "5%",
  },
  image: { height: "100%", width: "100%" },
});
