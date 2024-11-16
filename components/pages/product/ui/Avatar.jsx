"use client";

export default function Avatar({ orders }) {
  if (orders.length !== 0) {
    return (
      <>
        {orders.length !== 0 && (
          <Avatar.group maxCount={2} maxPopoverTrigger="click" size="default">
            {orders.map((item) => (
              <Avatar
                key={item.orderId._id}
                src={item?.orderId?.userId?.image || images.person}
                size="default"
              />
            ))}
          </Avatar.group>
        )}
      </>
    );
  } else {
    return null;
  }
}
