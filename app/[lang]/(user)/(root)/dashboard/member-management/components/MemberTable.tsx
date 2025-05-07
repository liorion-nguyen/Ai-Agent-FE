const MemberTable = () => {
  // const { members } = useMemberStore();
  // const { getMembers, loading } = useGetMembers();
  // useEffect(() => {
  //     getMembers();
  // }, []);
  const members = [
    {
      fullName: 'Nguyen Quoc Chung',
      email: 'liorion.nguyen@gmail.com',
      role: 'Chủ sở hữu',
      phone: '0708200334',
      createdAt: '25/04/2025 - 10:04',
    },
  ];
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tên
            </th>
            <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vai trò
            </th>
            <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Số điện thoại
            </th>
            <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ngày tạo
            </th>
            <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hoạt động
            </th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => {
            const isActive = true;
            return (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-600">
                        {member.fullName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {member.fullName}
                      </p>
                      <p className="text-xs text-gray-500">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      member.role === 'Chủ sở hữu'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {member.role}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-900">
                  {member.phone}
                </td>
                <td className="py-3 px-4 text-sm text-gray-900">
                  {member.createdAt}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full mr-1 ${
                        isActive ? 'bg-green-500' : 'bg-gray-500'
                      }`}
                    ></span>
                    {isActive ? 'Hoạt động' : 'Không hoạt động'}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MemberTable;
