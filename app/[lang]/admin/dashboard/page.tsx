const AdminDashBoardPage = () => {
  return (
    <main className="flex-1 flex flex-col bg-muted p-1 md:p-4">
      <h1 className="text-3xl font-bold mb-8">
        Chào mừng đến với trang quản trị
      </h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm border">
          <h2 className="text-lg font-semibold text-muted-foreground mb-1">
            Người dùng
          </h2>
          <p className="text-3xl font-bold text-primary">150</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm border">
          <h2 className="text-lg font-semibold text-muted-foreground mb-1">
            Đơn hàng
          </h2>
          <p className="text-3xl font-bold text-primary">320</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm border">
          <h2 className="text-lg font-semibold text-muted-foreground mb-1">
            Doanh thu
          </h2>
          <p className="text-3xl font-bold text-primary">45.000.000₫</p>
        </div>
      </section>
    </main>
  );
};

export default AdminDashBoardPage;
