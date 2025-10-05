// Simple Netlify Function scaffold to receive JSON POSTs
exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }
  try {
    const data = JSON.parse(event.body || '{}')
    // TODO: add processing (send email, save to DB)
    console.log('Received contact submission:', data)
    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true })
    }
  } catch (err) {
    console.error(err)
    return { statusCode: 500, body: 'Server error' }
  }
}
