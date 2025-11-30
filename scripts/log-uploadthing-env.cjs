const maskValue = (value) => {
  if (!value) return 'not-set'
  if (value.length <= 4) return `${value[0]}***`
  const prefix = value.slice(0, 4)
  const suffix = value.slice(-2)
  return `${prefix}***${suffix}`
}

const MOCK_SECRET_PREFIX = 'sk_test_dev_local_mock'

const hasSecret = Boolean(process.env.UPLOADTHING_SECRET)
const hasAppId = Boolean(process.env.UPLOADTHING_APP_ID)
const hasCredentials = hasSecret && hasAppId
const isMockCredentials = hasSecret && process.env.UPLOADTHING_SECRET.startsWith(MOCK_SECRET_PREFIX)
const resolvedMockMode = (process.env.NEXT_PUBLIC_UPLOADTHING_MOCK_MODE ?? (hasCredentials && !isMockCredentials ? 'false' : 'true')).toString()
const mockModeEnabled = resolvedMockMode === 'true' || isMockCredentials

const status = {
  hasSecret,
  hasAppId,
  hasCredentials,
  mockModeEnabled,
  resolvedMockMode,
  isMockCredentials,
  secretPreview: maskValue(process.env.UPLOADTHING_SECRET),
  appIdPreview: maskValue(process.env.UPLOADTHING_APP_ID),
}

const logPrefix = '[UploadThing Startup]'

console.log(logPrefix, 'Environment summary:', status)

if (!hasCredentials) {
  console.warn(logPrefix, '⚠️  Missing UploadThing credentials.')
  console.warn(logPrefix, '📝  Set UPLOADTHING_SECRET and UPLOADTHING_APP_ID in .env.local')
  console.warn(logPrefix, '🌐  Get credentials at: https://uploadthing.com/dashboard')
} else if (isMockCredentials) {
  console.warn(logPrefix, '⚠️  Using MOCK credentials for local development.')
  console.warn(logPrefix, '📝  Uploads will fail. Replace with real credentials for testing.')
  console.warn(logPrefix, '🌐  Get real credentials at: https://uploadthing.com/dashboard')
} else if (mockModeEnabled) {
  console.warn(logPrefix, '⚠️  Mock mode explicitly enabled (NEXT_PUBLIC_UPLOADTHING_MOCK_MODE=true).')
  console.warn(logPrefix, '📝  Set NEXT_PUBLIC_UPLOADTHING_MOCK_MODE=false to enable real uploads.')
} else {
  console.log(logPrefix, '✅ UploadThing configured with real credentials.')
  console.log(logPrefix, '✅ Real uploads are enabled.')
}

module.exports = {
  uploadThingEnvStatus: status,
}
