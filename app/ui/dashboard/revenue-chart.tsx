import { generateYAxis } from "@/app/lib/utils";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import { fetchRevenue } from "@/app/lib/data";

export default async function RevenueChart() {
  const revenue = await fetchRevenue();
  const chartHeight = 350;

  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {revenue.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2 group">
              <div className="relative w-full">
                <div
                  className="w-full rounded-md bg-blue-300 transition-all duration-300 ease-in-out group-hover:bg-blue-400"
                  style={{
                    height: `${(chartHeight / topLabel) * month.revenue}px`,
                  }}
                ></div>
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(month.revenue)}
                  </div>
                </div>
              </div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-6 pb-2">
          <div className="flex items-center">
            <CalendarIcon className="h-5 w-5 text-gray-500" />
            <h3 className="ml-2 text-sm text-gray-500">Last 12 months</h3>
          </div>
          <div className="text-sm text-gray-500">
            Total Revenue:{' '}
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(revenue.reduce((sum, month) => sum + month.revenue, 0))}
          </div>
        </div>
      </div>
    </div>
  );
}
