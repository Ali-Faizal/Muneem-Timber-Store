export async function POST(req) {
  try {
    const { phone, otp } = await req.json()

    if (!phone || !otp) {
      return Response.json({ success: false, message: 'Phone and OTP required' }, { status: 400 })
    }

    if (global.otpStore?.phone === phone && global.otpStore?.otp == otp) {
      global.otpStore = null // Clear OTP after successful verification
      return Response.json({ success: true, message: 'Login Successful ✅' })
    }

    return Response.json({ success: false, message: 'Invalid OTP ❌' }, { status: 401 })
  } catch (error) {
    console.error('Error verifying OTP:', error)
    return Response.json({ success: false, message: 'Failed to verify OTP' }, { status: 500 })
  }
}
