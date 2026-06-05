export async function POST(req) {
  try {
    const { phone } = await req.json()

    if (!phone) {
      return Response.json({ success: false, message: 'Phone number required' }, { status: 400 })
    }

    const otp = Math.floor(100000 + Math.random() * 900000)

    console.log(`OTP for ${phone}: ${otp}`)
    global.otpStore = { phone, otp, timestamp: Date.now() }

    return Response.json({ success: true, message: 'OTP sent successfully' })
  } catch (error) {
    console.error('Error sending OTP:', error)
    return Response.json({ success: false, message: 'Failed to send OTP' }, { status: 500 })
  }
}
