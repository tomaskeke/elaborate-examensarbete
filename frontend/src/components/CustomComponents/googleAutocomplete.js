import React, { useEffect, useRef, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API } from "@env";
import { useTheme } from "native-base";

const GooglePlacesInput = ({ setFormData, setIsFocused, formData, validateFormData, setHideAll }) => {
  const { colors } = useTheme();
  const [infoResponse, setInfoResponse] = useState();
  const ref = useRef();

  useEffect(() => {
    if (ref.current.value === "") {
      ref.current?.blur;
    }

    if (ref.current.setAddressText) {
      setIsFocused(false)
      setHideAll(false);

    }

    if (infoResponse) {
      const street_name = infoResponse.filter((obj) =>
        obj.types.includes(
          "route" || "locality" || "sublocality" || "sublocality_level_1"
        )
      );
      const street_number = infoResponse.filter((obj) =>
        obj.types.includes("street_number")
      );
      const street_zip = infoResponse.filter((obj) =>
        obj.types.includes("postal_code")
      );
      const city = infoResponse.filter((obj) =>
        obj.types.includes("postal_town" || "locality")
      );
      const state = infoResponse.filter((obj) =>
        obj.types.includes("administrative_area_level_1")
      );
      const country = infoResponse.filter((obj) =>
        obj.types.includes("country")
      );
      setFormData({
        ...formData,
        street_name: street_name[0]?.long_name,
        street_number: street_number[0]?.long_name,
        postal_code: street_zip[0]?.long_name,
        city: city[0]?.long_name,
        state: state[0]?.long_name,
        country: country[0]?.long_name,
      });
    }
  }, [infoResponse, setInfoResponse, setFormData]);
  return (
    <GooglePlacesAutocomplete
      textInputProps={{
        placeholderTextColor: colors.coolGray[300],
        onChangeText: (text) => {
          text === "" ? setIsFocused(false) : setIsFocused(true)
        },
        onBlur: () => setIsFocused(false),
        onFocus: () => setHideAll(true)
      }}
      ref={ref}
      styles={{
        container: {
          minWidth: 290,
          position: "relative",
          zIndex: 1,
        },
        textInput: {
          backgroundColor: colors.coolGray[700],
          borderWidth: 1,
          borderColor: colors.coolGray[700],
          borderRadius: 3,
          color: colors.lightText,
          fontSize: 12,
          fontFamily: "Inter_300Light",
        },
        listView: {
          width: "100%",
          maxHeight: 300,
          opacity: 1,
        },
        row: {
          backgroundColor: colors.coolGray[600],
        },
        description: {
          color: colors.coolGray[100],
        },
        separator: {
          backgroundColor: colors.coolGray[700],
        },
        poweredContainer: {
          backgroundColor: colors.coolGray[700],
          borderColor: colors.coolGray[600],
        },
      }}
      enablePoweredByContainer={false}
      placeholder="Adress"
      fetchDetails={true}
      onPress={(data, details) => {
        const info = details.address_components;
        setInfoResponse(info);
      }}
      query={{
        key: GOOGLE_MAPS_API,
        language: "sv",
        components: "country:se",
      }}
    />
  );
};

export default GooglePlacesInput;
