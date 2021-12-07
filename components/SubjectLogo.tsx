import React from "react";
import { View } from "react-native";
import { getDarkerColor } from "../functions";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const ArtLogo = ({ color }: { color: string }) => {
  const subjectLogoColor = getDarkerColor(color);
  return (
    <View
      style={{
        width: 80,
        height: 80,
        alignItems: "flex-end",
        justifyContent: "flex-end",
      }}
    >
      <FontAwesome name="paint-brush" size={80} color={subjectLogoColor} />
    </View>
  );
};

const MusicLogo = ({ color }: { color: string }) => {
  const subjectLogoColor = getDarkerColor(color);
  return (
    <View
      style={{
        width: 80,
        height: 80,
        alignItems: "flex-end",
        justifyContent: "flex-end",
      }}
    >
      <MaterialCommunityIcons
        name="music-clef-treble"
        size={80}
        color={subjectLogoColor}
        style={{ transform: [{ translateX: 20 }] }}
      />
    </View>
  );
};

const ScienceLogo = ({ color }: { color: string }) => {
  const subjectLogoColor = getDarkerColor(color);
  return (
    <View
      style={{
        width: 80,
        height: 80,
        alignItems: "flex-end",
        justifyContent: "flex-end",
      }}
    >
      <MaterialCommunityIcons
        name="dna"
        size={80}
        color={subjectLogoColor}
        style={{ transform: [{ translateX: 20 }] }}
      />
    </View>
  );
};

const LanguageLogo = ({ color }: { color: string }) => {
  const subjectLogoColor = getDarkerColor(color);
  return (
    <View
      style={{
        width: 80,
        height: 80,
        alignItems: "flex-end",
        justifyContent: "flex-end",
      }}
    >
      <MaterialCommunityIcons
        name="alphabetical-variant"
        size={85}
        color={subjectLogoColor}
        style={{ transform: [{ translateY: 10 }] }}
      />
    </View>
  );
};

const HumanitiesLogo = ({ color }: { color: string }) => {
  const subjectLogoColor = getDarkerColor(color);
  return (
    <View
      style={{
        width: 80,
        height: 80,
        alignItems: "flex-end",
        justifyContent: "flex-end",
      }}
    >
      <MaterialCommunityIcons
        name="human-handsdown"
        size={80}
        color={subjectLogoColor}
        style={{ transform: [{ translateX: 20 }] }}
      />
    </View>
  );
};

const MathematicsLogo = ({ color }: { color: string }) => {
  const subjectLogoColor = getDarkerColor(color);
  return (
    <View
      style={{
        width: 80,
        height: 80,
        alignItems: "flex-end",
        justifyContent: "flex-end",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <FontAwesome name="plus" size={38} color={subjectLogoColor} />
        <FontAwesome name="minus" size={38} color={subjectLogoColor} />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <FontAwesome name="times" size={38} color={subjectLogoColor} />
        <FontAwesome5 name="divide" size={38} color={subjectLogoColor} />
      </View>
    </View>
  );
};

const ReligionLogo = ({ color }: { color: string }) => {
  const subjectLogoColor = getDarkerColor(color);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <FontAwesome5 name="pray" size={75} color={subjectLogoColor} />
    </View>
  );
};

const FinanceLogo = ({ color }: { color: string }) => {
  const subjectLogoColor = getDarkerColor(color);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <FontAwesome5 name="dollar-sign" size={80} color={subjectLogoColor} />
    </View>
  );
};

const ItLogo = ({ color }: { color: string }) => {
  const subjectLogoColor = getDarkerColor(color);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <MaterialCommunityIcons
        name="laptop-mac"
        size={80}
        color={subjectLogoColor}
        style={{ transform: [{ translateY: 10 }] }}
      />
    </View>
  );
};

const SubjectLogo = ({ type, color }: { type: string; color: string }) => {
  if (type === "art") return <ArtLogo color={color} />;
  if (type === "music") return <MusicLogo color={color} />;
  if (type === "science") return <ScienceLogo color={color} />;
  if (type === "languages") return <LanguageLogo color={color} />;
  if (type === "humanities") return <HumanitiesLogo color={color} />;
  if (type === "math") return <MathematicsLogo color={color} />;
  if (type === "religion") return <ReligionLogo color={color} />;
  if (type === "finance") return <FinanceLogo color={color} />;
  if (type === "it") return <ItLogo color={color} />;
  return <View></View>;
};

export default SubjectLogo;
