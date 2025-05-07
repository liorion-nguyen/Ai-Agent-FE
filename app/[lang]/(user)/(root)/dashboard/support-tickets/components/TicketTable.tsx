const RequestTicketTable = () => {
  const tickets = [
    {
      id: '123456789',
      title: 'Tối test',
      content: 'abc',
      status: 'Đang xử lý',
      department: 'Kỹ thuật',
      createdAt: '07/05/2025',
    },
  ];
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Yêu cầu hỗ trợ
            </th>
            <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tiêu đề
            </th>
            <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nội dung
            </th>
            <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Trạng thái
            </th>
            <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phòng ban
            </th>
            <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ngày
            </th>
            <th className="py-2 px-4"></th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="py-3 px-4 text-sm text-gray-900">{ticket.id}</td>
              <td className="py-3 px-4 text-sm text-gray-900">
                {ticket.title}
              </td>
              <td className="py-3 px-4 text-sm text-gray-900">
                {ticket.content}
              </td>
              <td className="py-3 px-4">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  {ticket.status}
                </span>
              </td>
              <td className="py-3 px-4 text-sm text-gray-900">
                {ticket.department}
              </td>
              <td className="py-3 px-4 text-sm text-gray-900">
                {ticket.createdAt}
              </td>
              <td className="py-3 px-4">
                <span className="text-gray-500">→</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTicketTable;
