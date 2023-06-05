import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import VideoItem from "../models/VideoItem";
import { incrementViews } from "../api/ids";
import VideoCardContentTallView from "./VideoCardContentTallView";
import VideoCardDetailsWideView from "./VideoCardDetailsWideView";

interface Props {
  video: VideoItem;
  isWideView: boolean;
}

const VideoCard: React.FC<Props> = ({ video, isWideView }) => {
  const navigation = useNavigation();
  const goToPlayerScreen = async () => {
    await incrementViews(video.id);
    navigation.navigate("Player", {
      videoId: video.id,
      title: video.snippet.title,
      channelId: video.snippet.channelId,
      channelTitle: video.snippet.channelTitle,
    });
  };

  const renderCardDetails = () => {
    if (isWideView) {
      return <VideoCardDetailsWideView video={video} />;
    } else {
      return <VideoCardContentTallView video={video} />;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={goToPlayerScreen}>
      <View>{renderCardDetails()}</View>
    </TouchableWithoutFeedback>
  );
};

export default VideoCard;
