'use client'

import React, { useState, useEffect } from 'react'
import { HeaderClient } from '@/components/HeaderClient'
import { useParams, useRouter } from 'next/navigation'
import { useUIStore } from '@/store/uiStore'
import { Clock, MapPin, Phone, Home } from 'lucide-react'

const TRACKING_STAGES = [
  {
    id: 1,
    title: 'Order Confirmed',
    description: 'Your dream order has been confirmed',
    emoji: '✅',
    durationSeconds: 240, // 4 minutes
  },
  {
    id: 2,
    title: 'Preparing',
    description: 'Your food is being prepared in the dream kitchen',
    emoji: '👨‍🍳',
    durationSeconds: 360, // 6 minutes
  },
  {
    id: 3,
    title: 'Ready for Pickup',
    description: 'Your food is ready and waiting',
    emoji: '📦',
    durationSeconds: 120, // 2 minutes
  },
  {
    id: 4,
    title: 'Out for Delivery',
    description: 'Your order is on its way to you',
    emoji: '🛵',
    durationSeconds: 300, // 5 minutes
  },
  {
    id: 5,
    title: 'Delivered',
    description: 'Your dream meal has arrived!',
    emoji: '🎉',
    durationSeconds: 0,
  },
]

const TOTAL_DELIVERY_TIME = TRACKING_STAGES.slice(0, -1).reduce(
  (sum, stage) => sum + stage.durationSeconds,
  0
) // Total: 15 minutes (900 seconds)

type UIMode = 'warm' | 'cool'

// Warm Theme Component
function WarmUI({
  orderId,
  currentStage,
  timeRemaining,
  completionPercentage,
  formatTime,
  router,
}: {
  orderId: string
  currentStage: number
  timeRemaining: number
  completionPercentage: number
  formatTime: (seconds: number) => string
  router: ReturnType<typeof useRouter>
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-orange-50 to-orange-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <HeaderClient />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Tracking Your Order</h1>
            <p className="text-slate-600 dark:text-slate-400">Order #{orderId}</p>
          </div>
        </div>

        {/* Current Status Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-[#FC8019]">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-[#FC8019] to-[#FD9139] rounded-full flex items-center justify-center text-5xl animate-bounce shadow-lg">
              {TRACKING_STAGES[currentStage].emoji}
            </div>

            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">
                {TRACKING_STAGES[currentStage].title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {TRACKING_STAGES[currentStage].description}
              </p>

              {currentStage < TRACKING_STAGES.length - 1 && (
                <div className="flex items-center gap-4">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-semibold">
                    ~{formatTime(timeRemaining)} remaining
                  </span>
                </div>
              )}

              {currentStage === TRACKING_STAGES.length - 1 && (
                <div className="flex items-center gap-4 text-green-600 dark:text-green-400">
                  <span className="text-2xl">✅</span>
                  <span className="font-semibold">Order delivered successfully!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-8 border border-orange-200 dark:border-orange-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Overall Progress</h3>
            <span className="text-sm font-semibold text-[#FC8019]">
              {Math.round(completionPercentage)}%
            </span>
          </div>
          <div className="w-full h-3 bg-orange-200 dark:bg-orange-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FC8019] to-[#FD9139] transition-all duration-500 shadow-md"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Progress Timeline */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-8 border border-orange-200 dark:border-orange-700">
          <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-slate-100">Delivery Timeline</h2>

          <div className="space-y-6">
            {TRACKING_STAGES.map((stage, index) => (
              <div key={stage.id} className="flex gap-6">
                {/* Timeline Dot and Line */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all shadow-md ${
                      index <= currentStage
                        ? 'bg-gradient-to-br from-[#FC8019] to-[#FD9139] text-white scale-110'
                        : 'bg-orange-100 dark:bg-orange-800 text-orange-600 dark:text-orange-300'
                    }`}
                  >
                    {stage.emoji}
                  </div>

                  {index < TRACKING_STAGES.length - 1 && (
                    <div
                      className={`w-1 h-16 my-2 transition-colors ${
                        index < currentStage
                          ? 'bg-gradient-to-b from-[#FC8019] to-orange-400'
                          : 'bg-orange-200 dark:bg-orange-700'
                      }`}
                    ></div>
                  )}
                </div>

                {/* Stage Content */}
                <div className="pb-4 flex-1">
                  <h3
                    className={`text-lg font-bold ${
                      index <= currentStage
                        ? 'text-slate-900 dark:text-slate-100'
                        : 'text-orange-600 dark:text-orange-400'
                    }`}
                  >
                    {stage.title}
                  </h3>
                  <p className="text-orange-700 dark:text-orange-300 text-sm mb-2">
                    {stage.description}
                  </p>

                  {index <= currentStage && (
                    <span className="text-xs font-semibold text-white bg-[#FC8019] dark:bg-[#FC8019] px-3 py-1 rounded-full shadow-md">
                      {index === currentStage ? 'In Progress' : 'Completed'}
                    </span>
                  )}

                  {index === currentStage && stage.durationSeconds > 0 && (
                    <div className="mt-2 text-xs text-orange-600 dark:text-orange-300">
                      ⏱️ ~{formatTime(stage.durationSeconds)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-orange-200 dark:border-orange-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-800 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#FC8019] dark:text-orange-400" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Delivery Address</h3>
            </div>
            <p className="text-orange-700 dark:text-orange-300 text-sm">
              123 Main Street, New York, NY 10001
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-orange-200 dark:border-orange-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Support</h3>
            </div>
            <p className="text-orange-700 dark:text-orange-300 text-sm">
              +91 1800-DREAMFOOD
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-orange-200 dark:border-orange-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Total Time</h3>
            </div>
            <p className="text-orange-700 dark:text-orange-300 text-sm font-semibold">
              ~{Math.ceil(TOTAL_DELIVERY_TIME / 60)} minutes
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => router.push('/home')}
            className="py-3 bg-gradient-to-r from-[#FC8019] to-[#FD9139] text-white font-semibold rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2 shadow-md"
          >
            <Home className="w-5 h-5" />
            Continue Shopping
          </button>

          <button
            onClick={() => router.push('/')}
            className="py-3 bg-orange-100 dark:bg-orange-800 text-orange-900 dark:text-orange-100 font-semibold rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2"
          >
            Back to Home
          </button>
        </div>
      </section>
    </div>
  )
}

// Cool Theme Component
function CoolUI({
  orderId,
  currentStage,
  timeRemaining,
  completionPercentage,
  formatTime,
  router,
}: {
  orderId: string
  currentStage: number
  timeRemaining: number
  completionPercentage: number
  formatTime: (seconds: number) => string
  router: ReturnType<typeof useRouter>
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white dark:from-slate-900 dark:to-slate-800">
      <HeaderClient />

      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Order #{orderId}</h1>
        </div>

        {/* Main Tracking Card */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg overflow-hidden mb-8">
          {/* Red Header */}
          <div className="bg-gradient-to-r from-[#E23744] to-[#D63447] text-white p-8">
            <div className="text-center mb-6">
              <h2 className="text-4xl font-bold mb-2">
                {TRACKING_STAGES[currentStage].emoji}
              </h2>
              <h3 className="text-2xl font-bold">
                {TRACKING_STAGES[currentStage].title}
              </h3>
            </div>

            {currentStage < TRACKING_STAGES.length - 1 && (
              <div className="text-center">
                <p className="text-lg mb-2">Time Remaining</p>
                <p className="text-4xl font-bold font-mono">
                  {formatTime(timeRemaining)}
                </p>
              </div>
            )}

            {currentStage === TRACKING_STAGES.length - 1 && (
              <div className="text-center text-white">
                <p className="text-xl font-semibold">Delivered Successfully!</p>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="px-8 py-6">
            <div className="w-full h-2 bg-red-100 dark:bg-red-900/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#E23744] to-[#D63447] transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="text-center text-sm text-[#E23744] dark:text-red-400 mt-2 font-semibold">
              {Math.round(completionPercentage)}% Complete
            </p>
          </div>

          {/* Stages */}
          <div className="px-8 py-6 space-y-4 border-t dark:border-slate-700">
            {TRACKING_STAGES.map((stage, index) => (
              <div
                key={stage.id}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                  index <= currentStage
                    ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700'
                    : 'bg-slate-50 dark:bg-slate-700/50'
                }`}
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                    index < currentStage
                      ? 'bg-green-500 text-white'
                      : index === currentStage
                        ? 'bg-[#E23744] text-white animate-pulse'
                        : 'bg-slate-300 dark:bg-slate-600 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {index < currentStage ? '✓' : stage.emoji}
                </div>

                <div className="flex-1">
                  <h4
                    className={`font-bold ${
                      index <= currentStage
                        ? 'text-slate-900 dark:text-white'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {stage.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {stage.description}
                  </p>
                </div>

                {index <= currentStage && (
                  <div className="flex-shrink-0 text-right">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        index === currentStage
                          ? 'bg-red-100 dark:bg-red-900/50 text-[#E23744] dark:text-red-300'
                          : 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                      }`}
                    >
                      {index === currentStage ? 'In Progress' : 'Completed'}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow">
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
              📍 Delivery To
            </p>
            <p className="font-semibold">123 Main Street</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              New York, NY 10001
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow">
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
              ⏱️ Estimated Time
            </p>
            <p className="font-semibold text-lg">15-18 min</p>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => router.push('/home')}
          className="w-full py-4 bg-gradient-to-r from-[#E23744] to-[#D63447] text-white font-bold rounded-xl hover:shadow-lg transition text-center"
        >
          Back to Home
        </button>
      </section>
    </div>
  )
}

export default function OrderTrackingPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.id as string
  const uiMode = useUIStore((state) => state.uiMode)

  const [currentStage, setCurrentStage] = useState(0)
  const [timeInCurrentStage, setTimeInCurrentStage] = useState(0)
  const [totalTime, setTotalTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeInCurrentStage((prev) => {
        const nextTime = prev + 1
        const currentStageDuration = TRACKING_STAGES[currentStage].durationSeconds

        if (currentStage < TRACKING_STAGES.length - 1) {
          if (nextTime >= currentStageDuration) {
            setCurrentStage((stage) => stage + 1)
            return 0
          }
        }

        return nextTime
      })

      setTotalTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [currentStage])

  const currentStageDuration = TRACKING_STAGES[currentStage].durationSeconds
  const timeRemaining = currentStageDuration - timeInCurrentStage
  const completionPercentage = (totalTime / TOTAL_DELIVERY_TIME) * 100

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  // Render based on global UI mode
  if (uiMode === 'cool') {
    return (
      <CoolUI
        orderId={orderId}
        currentStage={currentStage}
        timeRemaining={timeRemaining}
        completionPercentage={completionPercentage}
        formatTime={formatTime}
        router={router}
      />
    )
  }

  return (
    <WarmUI
      orderId={orderId}
      currentStage={currentStage}
      timeRemaining={timeRemaining}
      completionPercentage={completionPercentage}
      formatTime={formatTime}
      router={router}
    />
  )
}
