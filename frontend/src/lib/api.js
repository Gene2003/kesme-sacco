const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

const ACCESS_KEY = 'kesme_access'
const REFRESH_KEY = 'kesme_refresh'

export const tokens = {
  get access()  { return localStorage.getItem(ACCESS_KEY) },
  get refresh() { return localStorage.getItem(REFRESH_KEY) },
  set(access, refresh) {
    if (access)  localStorage.setItem(ACCESS_KEY, access)
    if (refresh) localStorage.setItem(REFRESH_KEY, refresh)
  },
  clear() {
    localStorage.removeItem(ACCESS_KEY)
    localStorage.removeItem(REFRESH_KEY)
  },
}

async function refreshAccess() {
  const r = tokens.refresh
  if (!r) throw new Error('No refresh token')
  const res = await fetch(`${API_URL}/api/auth/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh: r }),
  })
  if (!res.ok) {
    tokens.clear()
    throw new Error('Refresh failed')
  }
  const data = await res.json()
  tokens.set(data.access, data.refresh)
  return data.access
}

export async function api(path, { method = 'GET', body, headers = {}, auth = true } = {}) {
  const url = path.startsWith('http') ? path : `${API_URL}${path}`
  const isFormData = body instanceof FormData

  const buildHeaders = (token) => {
    const h = { ...headers }
    if (!isFormData && body !== undefined) h['Content-Type'] = 'application/json'
    if (auth && token) h['Authorization'] = `Bearer ${token}`
    return h
  }

  const send = (token) => fetch(url, {
    method,
    headers: buildHeaders(token),
    body: body === undefined ? undefined : (isFormData ? body : JSON.stringify(body)),
  })

  let res = await send(tokens.access)
  if (res.status === 401 && auth && tokens.refresh) {
    try {
      const fresh = await refreshAccess()
      res = await send(fresh)
    } catch {
      // fall through, caller handles 401
    }
  }

  const text = await res.text()
  const data = text ? safeJson(text) : null
  if (!res.ok) {
    const err = new Error(extractError(data) || `Request failed (${res.status})`)
    err.status = res.status
    err.data = data
    throw err
  }
  return data
}

function safeJson(t) { try { return JSON.parse(t) } catch { return t } }

function extractError(data) {
  if (!data) return null
  if (typeof data === 'string') return data
  if (data.detail) return data.detail
  if (data.non_field_errors) return data.non_field_errors.join(' ')
  const first = Object.entries(data)[0]
  if (first) {
    const [k, v] = first
    const msg = Array.isArray(v) ? v.join(' ') : (typeof v === 'string' ? v : JSON.stringify(v))
    return `${k}: ${msg}`
  }
  return null
}

export { API_URL }
