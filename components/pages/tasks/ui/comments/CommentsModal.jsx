"use client";

import { useEffect, useRef, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal, Input, Button, Avatar, Collapse, Empty, Select } from "antd";
import { SendOutlined } from "@ant-design/icons";
import moment from "moment-jalaali";

import { sendReplyToComment, sendTaskComment } from "@/services/queries";
import { useGetTaskComments } from "@/hooks/useTasksQuery";
import CommentsActions from "./ui/CommentsActions";
import { QUERY_KEY } from "@/services/queriesKey";
import Loader from "@/components/shared/Loader";
import LikeButton from "./ui/LikeButton";
import { icons, sortOptions } from "@/constants";
import CustomSelect from "@/components/shared/form/CustomSelect";

const { Panel } = Collapse;

moment.locale("fa");
moment.loadPersian({ usePersianDigits: true });

export default function CommentsModal({
  isOpen,
  onClose,
  taskID,
  currentUser,
}) {
  const [newComment, setNewComment] = useState("");
  const [replyTarget, setReplyTarget] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [sortOrder, setSortOrder] = useState("createdAt_desc");

  const loadingTarget = useRef(null);

  const queryClient = useQueryClient();

  const {
    comments,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useGetTaskComments(taskID, sortOrder);

  console.log(comments);

  const mutation = useMutation({
    mutationFn: ({ taskID, content }) => sendTaskComment({ taskID, content }),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.tasks_comments, taskID]);
      setNewComment("");
      refetch();
    },
    onError: (error) => {
      console.error("Error posting comment:", error);
    },
  });

  useEffect(() => {
    const ovserver = new IntersectionObserver((entries) => {
      if (hasNextPage && entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    if (loadingTarget.current) {
      ovserver.observe(loadingTarget.current);
    }

    return () => {
      if (loadingTarget.current) {
        ovserver.unobserve(loadingTarget.current);
      }
    };
  }, [loadingTarget, hasNextPage, fetchNextPage]);

  const handleSend = () => {
    if (!newComment.trim()) return;
    mutation.mutate({ taskID, content: newComment });
  };

  const handleReply = (commentId) => {
    if (!replyContent.trim()) return;

    replyMutation.mutate({
      taskID,
      commentId,
      content: replyContent,
    });
  };

  const replyMutation = useMutation({
    mutationFn: ({ taskID, commentId, content }) =>
      sendReplyToComment({ taskID, commentId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.tasks_comments, taskID]);
      setReplyContent("");
      setReplyTarget(null);
    },
    onError: (error) => {
      console.error("Error sending reply:", error);
    },
  });

  const handleSortChange = (value) => {
    setSortOrder(value);
    refetch();
  };

  return (
    <Modal
      title="پیام‌ها"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      height={600}
    >
      <div className="flex flex-col space-y-4">
        <CustomSelect
          value={sortOrder}
          options={sortOptions}
          onChange={handleSortChange}
          label="مرتب‌سازی"
          classNames="w-[200px]"
        />
        <div className="overflow-y-auto max-h-[300px] space-y-3">
          {isLoading ? (
            <div className="w-full flex items-center justify-center">
              <Loader />
            </div>
          ) : comments?.length > 0 ? (
            comments?.map((comment) => (
              <div key={comment._id} className="space-y-3">
                <div
                  className={`w-full flex items-start justify-between px-2 py-4 border rounded-lg shadow-md ${
                    comment.createdBy?._id.toString() === currentUser
                      ? "bg-lightGreen"
                      : "bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Avatar src={comment.createdBy.images} size={40} />
                    <div className="flex flex-col mr-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">
                          {comment.createdBy.firstName}
                        </span>
                        <span className="text-xs text-gray-400">
                          {moment(comment.createdAt).fromNow()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1  overflow-hidden  w-[250px]">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <CommentsActions
                        comment={comment}
                        currentUser={currentUser}
                        taskID={taskID}
                        onRefresh={() =>
                          queryClient.invalidateQueries([
                            QUERY_KEY.tasks_comments,
                            taskID,
                          ])
                        }
                      />
                      <Button
                        type="link"
                        onClick={() => setReplyTarget(comment._id)}
                        className="text-sm text-blue-500"
                      >
                        {icons.replay}
                      </Button>
                    </div>
                    <LikeButton
                      taskID={taskID}
                      likes={comment.likes}
                      commentId={comment._id}
                      currentUserId={currentUser}
                    />
                  </div>
                </div>
                {comment.replies.length > 0 && (
                  <Collapse className="ml-8" bordered={false}>
                    <Panel
                      key={comment._id}
                      header={`مشاهده پاسخ‌ها (${comment.replies.length})`}
                    >
                      {comment.replies.map((reply) => (
                        <div
                          key={reply._id}
                          className="flex items-start mt-3 p-2 border rounded-lg bg-gray-50"
                        >
                          <Avatar src={reply.createdBy.images} size={30} />
                          <div className="flex flex-col mr-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm">
                                {reply.createdBy.firstName}
                              </span>
                              <span className="text-xs text-gray-400">
                                {moment(reply.createdAt).fromNow()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 mt-1">
                              {reply.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </Panel>
                  </Collapse>
                )}

                {replyTarget === comment._id && (
                  <div className="flex flex-col gap-2 mt-2 ml-8">
                    <Input
                      placeholder="پاسخ خود را بنویسید..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      className="rounded-[8px] border-gray-300 shadow-sm"
                      autoSize={{ minRows: 1, maxRows: 5 }}
                    />

                    {replyContent.trim() && (
                      <div className="p-2 border rounded-[8px] bg-gray-50 text-gray-700">
                        <p className="text-sm font-medium text-gray-500 mb-1">
                          پیش‌نمایش:
                        </p>
                        <p>{replyContent}</p>
                      </div>
                    )}
                    <Button
                      type="primary"
                      icon={<SendOutlined />}
                      onClick={() => handleReply(comment._id)}
                      loading={replyMutation.isLoading}
                      disabled={!replyContent.trim()}
                      className="rounded-[8px]"
                    >
                      ارسال
                    </Button>
                  </div>
                )}
                <div ref={loadingTarget}></div>
              </div>
            ))
          ) : (
            <div className="w-full flex items-center justify-center">
              <Empty description="پیامی وجود ندارد" />
            </div>
          )}
        </div>
        {isFetchingNextPage && (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        )}

        <div className="flex items-center gap-2">
          <Input.TextArea
            placeholder="پیام خود را بنویسید..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            autoSize={{ minRows: 1, maxRows: 5 }}
            className="rounded-[8px] border-gray-300 shadow-sm"
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            loading={mutation.isLoading}
            disabled={!newComment.trim()}
            className="rounded-[8px]"
          >
            ارسال
          </Button>
        </div>
      </div>
    </Modal>
  );
}