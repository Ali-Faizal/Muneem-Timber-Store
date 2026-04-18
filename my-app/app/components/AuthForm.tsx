'use client'

import { useState } from 'react'
import axios from 'axios'
import { Phone } from 'lucide-react'

export default function AuthForm() {
  const [step, setStep] = useState(1)
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)

  const sendOtp = async () => {
    if (!phone || phone.length < 10) {
      alert('Valid phone number daalein')
      return
    }

    setLoading(true)
    try {
      const res = await axios.post('/api/send-otp', { phone })
      if (res.data.success) {
        setStep(2)
        alert('OTP sent! Check console for OTP (development only)')
      } else {
        alert(res.data.message || 'OTP send nahi hua')
      }
    } catch (error) {
      alert('Error sending OTP')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      alert('6-digit OTP daalein')
      return
    }

    setLoading(true)
    try {
      const res = await axios.post('/api/verify-otp', { phone, otp })
      if (res.data.success) {
        alert('✅ ' + res.data.message)
        setStep(1)
        setPhone('')
        setOtp('')
      } else {
        alert(res.data.message || 'Verification failed')
      }
    } catch (error) {
      alert('Error verifying OTP')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-[26px] font-extrabold text-gray-900">Muneem Timber</h2>
        <p className="text-[13px] text-gray-600 mt-1.5">Hardoi, UP · Since 2010</p>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-2">
              आपका Mobile Number
            </label>
            <div className="flex gap-2">
              <span className="flex items-center px-3 bg-gray-100 rounded-lg text-gray-600">+91</span>
              <input
                type="tel"
                placeholder="9580716752"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                maxLength="10"
              />
            </div>
          </div>

          <button
            onClick={sendOtp}
            disabled={!phone || loading}
            className="w-full bg-blue-600 text-white py-[13px] rounded-[10px] hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition text-[15px] font-bold flex items-center justify-center gap-3"
          >
            <Phone size={18} />
            {loading ? 'भेज रहे हैं...' : 'OTP भेजें'}
          </button>

          <p className="text-xs text-gray-500 text-center pt-1">
            Development mode: OTP console mein dikhaai dega
          </p>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-2">
              6-Digit OTP दर्ज करें
            </label>
            <input
              type="text"
              placeholder="000000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-2xl text-center tracking-widest"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              maxLength="6"
            />
          </div>

          <button
            onClick={verifyOtp}
            disabled={!otp || otp.length !== 6 || loading}
            className="w-full bg-green-600 text-white py-[13px] rounded-[10px] hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition text-[15px] font-bold"
          >
            {loading ? 'जाँच रहे हैं...' : 'Verify करें'}
          </button>

          <button
            onClick={() => {
              setStep(1)
              setPhone('')
              setOtp('')
            }}
            className="w-full bg-gray-300 text-gray-700 py-[13px] rounded-[10px] hover:bg-gray-400 transition text-[15px] font-bold"
          >
            वापस जाएं
          </button>
        </div>
      )}
    </div>
  )
}



