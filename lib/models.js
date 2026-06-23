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
  phone: { type: String },
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

// 6. Worker Schema
const WorkerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  experience: { type: String },
  dailyRate: { type: Number, required: true },
  skills: { type: Array, default: [] },
  availability: { type: Boolean, default: true },
  rating: { type: Number, default: 4.8 },
  location: { type: String, default: "Hardoi" },
  phone: { type: String },
  whatsapp: { type: String },
  photoUrl: { type: String }, // Supports base64 data URL
  createdAt: { type: Date, default: Date.now },
});

// 7. ServiceRequest Schema
const ServiceRequestSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  customerAddress: { type: String, required: true },
  serviceType: { type: String, required: true },
  bookingDate: { type: String, required: true },
  notes: { type: String },
  status: { type: String, default: "Pending" }, // Pending, Worker Assigned, Completed, Cancelled
  assignedWorker: { type: mongoose.Schema.Types.ObjectId, ref: "Worker", default: null },
  createdAt: { type: Date, default: Date.now },
});

// 8. Owner Schema
const OwnerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, default: "owner" },
  password: { type: String, required: true }, // hashed password
  recoveryDetails: { type: String, default: "" },
  recoveryEmail: { type: String, default: "" },
  isEmailVerified: { type: Boolean, default: true },
  otpCode: { type: String, default: "" },
  otpExpires: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
});

// 9. LoginAttempt Schema (Brute Force Protection)
const LoginAttemptSchema = new mongoose.Schema({
  username: { type: String, required: true },
  ip: { type: String },
  attempts: { type: Number, default: 0 },
  lockedUntil: { type: Date, default: null }
});

// 10. Owner/Customer Activity Log Schema
const ActivityLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  user: { type: String, required: true }, // Performed by (owner or user email)
  date: { type: String, required: true },
  time: { type: String, required: true },
  affectedRecord: { type: String },
  timestamp: { type: Date, default: Date.now }
});

// 11. DashboardNotification Schema
const DashboardNotificationSchema = new mongoose.Schema({
  type: { type: String, required: true }, // "registration" or "order"
  title: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// 12. UserLoginLog Schema (Customer Dashboard tracking)
const UserLoginLogSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  loginTime: { type: Date, default: Date.now },
  deviceInfo: { type: String },
  lastActive: { type: Date, default: Date.now }
});

// Compile Models
export const User = getModel("User", UserSchema);
export const Product = getModel("Product", ProductSchema);
export const Order = getModel("Order", OrderSchema);
export const WalkinBill = getModel("WalkinBill", WalkinBillSchema);
export const Invoice = getModel("Invoice", InvoiceSchema);
export const Worker = getModel("Worker", WorkerSchema);
export const ServiceRequest = getModel("ServiceRequest", ServiceRequestSchema);
export const Owner = getModel("Owner", OwnerSchema);
export const LoginAttempt = getModel("LoginAttempt", LoginAttemptSchema);
export const ActivityLog = getModel("ActivityLog", ActivityLogSchema);
export const DashboardNotification = getModel("DashboardNotification", DashboardNotificationSchema);
export const UserLoginLog = getModel("UserLoginLog", UserLoginLogSchema);


