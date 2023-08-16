import type { OrderItem } from "@prisma/client";

interface OrderProps {
  date: string;
  items: OrderItem[];
  total: number;
  id: string;
}

export default function Order({ date, items, total, id }: OrderProps) {
  const STANDARD_SHIPPING_PRICE = 1500;

  return (
    <div className="mt-2 mb-2 w-full">
      <div>
        <h2>
          <div className="flex w-full items-center justify-between rounded-t-xl border border-b-0 border-gray-200 p-5 text-left font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-gray-800">
            {/* From Order table: createdAt */}
            <div className="flex gap-2">
              <span>Order Placed: {date}</span>
              <span>Order Number: {id}</span>
            </div>
          </div>
        </h2>
        <div>
          <div className="border border-b-0 border-gray-200 p-5 dark:border-gray-700 dark:bg-gray-900">
            <div className="relative overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="rounded-l-lg px-6 py-3">
                      Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Qty
                    </th>
                    <th scope="col" className="rounded-r-lg px-6 py-3">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr className="bg-white dark:bg-gray-800" key={index}>
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                      >
                        {item.name}{" "}
                        {/* You will need to fetch or include this property */}
                      </th>
                      <td className="px-6 py-4">{item.quantity}</td>
                      <td className="px-6 py-4">
                        ${(item.price / 100).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  {/* Standard Shipping */}
                  <tr className="bg-white dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      Standard Shipping
                    </th>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4">
                      ${(STANDARD_SHIPPING_PRICE / 100).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="font-semibold text-gray-900 dark:text-white">
                    <th scope="row" className="px-6 py-3 text-base">
                      Total
                    </th>
                    <td className="px-6 py-3">{items.length}</td>
                    <td className="px-6 py-3">
                      ${((total + STANDARD_SHIPPING_PRICE) / 100).toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
