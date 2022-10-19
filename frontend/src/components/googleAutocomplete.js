import React, { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API } from "@env";
import { useTheme } from "native-base";
import { useFocusEffect } from "@react-navigation/native";

const GooglePlacesInput = ({ formData, setFormData }) => {
  const [searchResponse, setSearchResponse] = useState({});
  const [focused, setFocused] = useState(false)
  const { colors } = useTheme();
  useFocusEffect(React.useCallback(() => {}, [formData]));
  return (
    <GooglePlacesAutocomplete
      textInputProps={{
        placeholderTextColor: colors.coolGray[300],
      }}
      styles={{
        container: {
          minWidth: 300,
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
          maxWidth: 300,
          maxHeight: 300,
          position: "absolute",
          zIndex: 1,
          marginTop: 45,
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
      placeholder="Adress.."
      fetchDetails={true}
      onPress={(data, details) => {
        const info = details.address_components;
        const street_name = info.filter(obj => obj.types.includes("route" || "locality" || "sublocality" || "sublocality_level_1"))
        const street_number = info.filter(obj => obj.types.includes("street_number"))
        const street_zip = info.filter(obj => obj.types.includes("postal_code"))
        const city = info.filter(obj => obj.types.includes("postal_town" || "locality"))
        const state = info.filter(obj => obj.types.includes("administrative_area_level_1"))
        const country = info.filter(obj => obj.types.includes("country"))
        console.log(info)
  if (info) {
          setFormData({
            street_name: street_name[0]?.long_name,
            street_number: street_number[0]?.long_name,
            postal_code: street_zip[0]?.long_name,
            city: city[0]?.long_name,
            state: state[0]?.long_name,
            country: country[0]?.long_name,
          });
        }
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
