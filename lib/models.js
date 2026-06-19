import mongoose from "mongoose";

// Helper to prevent compilation errors in development on hot reloads
const getModel = (modelName, schema) => {
  return mongoose.models[modelName] || mongoose.model(modelName, schema);
};

// 1. User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "customer" }, // customer or admin
  createdAt: { type: Date, default: Date.now },
});

// 2. Product Schema
const ProductSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  desc: { type: String },
  price: { type: String },
  dailyRate: { type: Number, required: true },
  stock: { type: Number, default: 100 },
});

// 3. Order Schema (Online Customer Bookings)
const OrderSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  customer: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  address: { type: String },
  projectLocation: { type: String },
  bookingDate: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  total: { type: String },
  status: { type: String, default: "New Order" }, // New Order, Confirmed, Out For Delivery, Active Rental, Completed, Cancelled
  duration: { type: String },
  itemsCount: { type: Number },
  method: { type: String },
  items: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now }
});

// 4. WalkinBill Schema (Offline Billing Log)
const WalkinBillSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  customer: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  projectLocation: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  bookingDate: { type: String },
  duration: { type: String },
  items: { type: Array, default: [] },
  subtotal: { type: Number },
  discountAmount: { type: Number },
  gstAmount: { type: Number },
  total: { type: String },
  gstApplied: { type: Boolean },
  discountOption: { type: String },
  manualDiscountVal: { type: String },
  notes: { type: String },
  status: { type: String, default: "Confirmed" },
  method: { type: String, default: "CASH" },
  createdAt: { type: Date, default: Date.now }
});

// 5. Invoice Schema (Unified Invoices for viewing / billing records)
const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  customer: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  projectLocation: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  bookingDate: { type: String },
  duration: { type: String },
  items: { type: Array, default: [] },
  subtotal: { type: Number },
  discountAmount: { type: Number },
  gstAmount: { type: Number },
  total: { type: String },
  gstApplied: { type: Boolean },
  notes: { type: String },
  status: { type: String },
  method: { type: String },
  type: { type: String, required: true }, // "Online" or "Walk-In"
  createdAt: { type: Date, default: Date.now }
});

// Compile Models
export const User = getModel("User", UserSchema);
export const Product = getModel("Product", ProductSchema);
export const Order = getModel("Order", OrderSchema);
export const WalkinBill = getModel("WalkinBill", WalkinBillSchema);
export const Invoice = getModel("Invoice", InvoiceSchema);
