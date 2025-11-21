"use client";

import React, { useState } from "react";
import { getOrderStatusLabel, type Order } from "@/lib/orders-utils";
import { PriceTag } from "@/components/common/PriceTag";
import { getCartCurrency } from "@/lib/currency";

export function OrdersPanel({ recentOrders }: { recentOrders: Order[] }) {
  const [selectedStatus, setSelectedStatus] = useState<string>("همه سفارش ها");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const statusColors: Record<string, string> = {
    "همه سفارش ها": "from-blue-600 to-purple-600",
    "در حال پردازش ": "from-amber-500 to-orange-500",
    "در حال ارسال ": "from-blue-500 to-cyan-500",
    "تحویل شده ": "from-emerald-500 to-teal-500",
    "لغو شده ": "from-red-500 to-pink-500",
  };

  const statusMapping: Record<string, string> = {
    "در حال پردازش": "processing",
    "در حال ارسال": "shipped",
    "تحویل شده": "delivered",
    "لغو شده": "cancelled",
  };

  const filteredOrders = recentOrders.filter((order) => {
    // Filter by status
    if (selectedStatus !== "همه سفارش ها") {
      const mappedStatus = statusMapping[selectedStatus];
      if (order.status !== mappedStatus) return false;
    }
    // Filter by search query
    if (searchQuery.trim()) {
      return order.id.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-neutral-200/60 bg-white p-6 shadow-lg shadow-neutral-900/5 sm:p-8">
      <div className="absolute left-0 top-0 h-32 w-full bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative">
        <div className="flex flex-col gap-4 border-b border-neutral-100 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25">
              <svg
                className="size-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900">
                مدیریت سفارش‌ها
              </h2>
              <p className="mt-0.5 text-xs text-neutral-500">
                پیگیری و مدیریت سفارشات خود
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="relative">
              <svg
                className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                className="w-full rounded-2xl border border-neutral-200/60 bg-neutral-50/50 py-2 pl-4 pr-10 text-sm text-neutral-700 outline-none backdrop-blur-sm transition-all duration-300 placeholder:text-neutral-400 focus:border-blue-500/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                placeholder="جستجو با کد سفارش..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 hover:shadow-lg hover:shadow-blue-500/20">
              <svg
                className="size-4 transition-transform duration-300 group-hover/btn:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              دانلود گزارش
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {Object.keys(statusColors).map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`group/filter rounded-2xl border px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                status === selectedStatus
                  ? "border-transparent bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                  : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:shadow-md"
              }`}
              type="button"
            >
              {status}
            </button>
          ))}
        </div>

        {filteredOrders.length === 0 ? (
          <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50/30 py-16">
            <div className="flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-neutral-100 to-neutral-200">
              <svg
                className="size-10 text-neutral-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-bold text-neutral-700">
              {searchQuery.trim()
                ? "سفارشی یافت نشد"
                : selectedStatus === "همه سفارش ها"
                ? "هنوز سفارشی ثبت نشده است"
                : `سفارش ${selectedStatus}ای وجود ندارد`}
            </h3>
            <p className="mt-2 text-sm text-neutral-500">
              {searchQuery.trim()
                ? "لطفا کلیدواژه دیگری را امتحان کنید"
                : "سفارشات شما در اینجا نمایش داده می‌شوند"}
            </p>
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            {filteredOrders.map((order, index) => (
              <li
                key={order.id}
                className="group/item relative overflow-hidden rounded-2xl border border-neutral-100 bg-gradient-to-br from-white to-neutral-50/50 p-4 transition-all duration-300 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover/item:opacity-100" />
                <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700">
                      <svg
                        className="size-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-neutral-900">
                        سفارش #{order.id.substring(0, 10)}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-neutral-500">
                        <svg
                          className="size-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                          />
                        </svg>
                        <span>
                          {new Date(order.created_at).toLocaleDateString(
                            "fa-IR",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 sm:items-end">
                    <PriceTag
                      value={order.total}
                      currency={getCartCurrency(order.items)}
                      weight="bold"
                    />
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                        order.status === "delivered"
                          ? "bg-emerald-100 text-emerald-700"
                          : order.status === "processing"
                          ? "bg-amber-100 text-amber-700"
                          : order.status === "shipped"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-neutral-100 text-neutral-700"
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          order.status === "delivered"
                            ? "bg-emerald-500"
                            : order.status === "processing"
                            ? "bg-amber-500"
                            : order.status === "shipped"
                            ? "bg-blue-500"
                            : "bg-neutral-500"
                        }`}
                      />
                      {getOrderStatusLabel(order.status)}
                    </span>
                  </div>
                </div>
                <button className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 transition-all duration-300 group-hover/item:opacity-100">
                  <svg
                    className="size-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
