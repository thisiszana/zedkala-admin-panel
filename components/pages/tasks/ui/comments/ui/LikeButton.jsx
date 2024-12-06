"use client";

import { useState } from "react";
import { Button, Tooltip } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEY } from "@/services/queriesKey";
import { toggleLikeComment } from "@/services/queries";

export default function LikeButton({
  commentId,
  likes,
  currentUserId,
  taskID,
}) {
  const queryClient = useQueryClient();
  const [localLikes, setLocalLikes] = useState(likes);
  const [isLiked, setIsLiked] = useState(localLikes.includes(currentUserId));

  const mutation = useMutation({
    mutationFn: () => toggleLikeComment({ commentId, taskID }),
    onMutate: () => {

      if (isLiked) {
        setLocalLikes((prev) => prev.filter((id) => id !== currentUserId));
      } else {
        setLocalLikes((prev) => [...prev, currentUserId]);
      }
      setIsLiked((prev) => !prev);
    },
    onError: (error) => {
      console.error("Error toggling like:", error);

      if (isLiked) {
        setLocalLikes((prev) => [...prev, currentUserId]);
      } else {
        setLocalLikes((prev) => prev.filter((id) => id !== currentUserId));
      }
      setIsLiked((prev) => !prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries([QUERY_KEY.tasks_comments, taskID]);
    },
  });

  const handleLikeClick = () => {
    mutation.mutate();
  };

  return (
    <div className="flex items-center flex-col md:flex-row gap-0 md:gap-2">
      <Tooltip title={isLiked ? "Unlike" : "Like"}>
        <Button
          type="text"
          shape="circle"
          icon={
            isLiked ? (
              <LikeFilled style={{ color: "#1890ff" }} />
            ) : (
              <LikeOutlined style={{ color: "#8c8c8c" }} />
            )
          }
          onClick={handleLikeClick}
          loading={mutation.isLoading}
          className="hover:scale-110 transition-transform duration-200"
        />
      </Tooltip>
      <span className="text-gray-600 text-sm">
        {localLikes.length > 0 ? localLikes.length : "0"}
      </span>
    </div>
  );
}
