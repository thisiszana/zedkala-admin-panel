import ProductsResult from "./ui/ProductsResult";
import AdminsResult from "./ui/AdminsResult";
import TasksResult from "./ui/TasksResult";

export default function SearchResult({ error, result, closeModal }) {
    if (error && error?.length !== 0) {
        return <Alert message={error} type="error" showIcon />;
      } else if (result !== null) {
        return (
          <div>
            {result?.admins?.length === 0 &&
            // result?.blogs?.length === 0 &&
            // result?.comments?.length === 0 &&
            // result?.users?.length === 0 &&
            result?.products?.length === 0 &&
            result?.tasks?.length === 0 ? (
              <div className="text-center">
                <h1 className="font-medium text-h4">پیدا نشد</h1>
                <p className="text-p1">
                  هیچ نتیجه ای برای {" "}
                  <span className="font-medium">
                    &quot;{result?.searchQuery}&quot;
                  </span>
                  یافت نشد
                </p>
                <p className="text-p1">
                سعی کنید اشتباهات تایپی را بررسی کنید یا از کلمات کامل استفاده کنید.
                </p>
              </div>
            ) : (
              <>
                <p>
                  نتایج برای {" "}
                  <span className="font-medium">
                    &quot;{result?.searchQuery}&quot;
                  </span>
                </p>
                <hr className="mt-2 mb-5" />
                <div className="space-y-5">
                  {result?.admins?.length !== 0 && (
                    <AdminsResult admins={result?.admins} closeModal={closeModal} />
                  )}
                  {result?.products?.length !== 0 && (
                    <ProductsResult
                      products={result?.products}
                      closeModal={closeModal}
                    />
                  )}
                  {/* {result?.blogs?.length !== 0 && (
                    <BlogsResult blogs={result?.blogs} closeModal={closeModal} />
                  )} */}
                  {/* {result?.comments?.length !== 0 && (
                    <CommentsResult
                      comments={result?.comments}
                      closeModal={closeModal}
                    />
                  )} */}
                  {result?.tasks?.length !== 0 && (
                    <TasksResult tasks={result?.tasks} closeModal={closeModal} />
                  )}
                  {/* {result?.users?.length !== 0 && (
                    <UsersResult users={result?.users} closeModal={closeModal} />
                  )} */}
                  {/* {result?.category?.length !== 0 && (
                    <CategoryResult category={result?.category} closeModal={closeModal} />
                  )} */}
                  {/* {result?.vendors?.length !== 0 && (
                    <VendorResult vendors={result?.vendors} closeModal={closeModal} />
                  )} */}
                </div>
              </>
            )}
          </div>
        );
      } else {
        return;
      }
}
