import DashboardLayout from "../components/layout/DashboardLayout";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const stats = [
    {
      title: "Total Students",
      value: "1,248",
      change: "+12%",
      color: "bg-blue-500",
    },
    {
      title: "Active Courses",
      value: "86",
      change: "+4%",
      color: "bg-green-500",
    },
    {
      title: "Today's Attendance",
      value: "94%",
      change: "+2%",
      color: "bg-purple-500",
    },
    {
      title: "Pending Grades",
      value: "23",
      change: "-5%",
      color: "bg-orange-500",
    },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 mt-1">
          Here's what's happening in your institution today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-xl shadow-sm p-6 border border-slate-100"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-500">
                {stat.title}
              </h3>
              <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
            </div>
            <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
            <p className="text-sm text-green-600 mt-2">
              {stat.change} from last month
            </p>
          </div>
        ))}
      </div>

      {/* Welcome Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800 mb-2">
          Hello, {user.firstName} {user.lastName}
        </h2>
        <p className="text-slate-600">
          You are logged in as{" "}
          <span className="font-medium capitalize">
            {user.role?.toLowerCase()}
          </span>
          . Use the sidebar to navigate through the system.
        </p>
      </div>
    </DashboardLayout>
  );
}
