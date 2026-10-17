# Text-to-image through the Gemini API (the key stays in the environment, never printed).
#   python gen-gemini.py "<prompt>" <out.png>
# Prints the output path on success; exits non-zero with the API error otherwise.
import os, sys, json, base64, urllib.request, urllib.error
# The key: the file ~/.claude/secrets/gemini.key first (one line, no quotes), then the
# environment. The file wins because the environment on this machine carried a revoked key
# (17 October 2026). Never print the key.
KEY_FILE = os.path.join(os.path.expanduser('~'), '.claude', 'secrets', 'gemini.key')
key = open(KEY_FILE, encoding='utf-8').read().strip() if os.path.exists(KEY_FILE) else ''
key = key or os.environ.get('GEMINI_API_KEY') or os.environ.get('GOOGLE_API_KEY')
if not key:
    raise SystemExit('no Gemini key: put it in ' + KEY_FILE)
prompt, out = sys.argv[1], sys.argv[2]
model = os.environ.get('GEMINI_IMAGE_MODEL', 'gemini-2.5-flash-image')
url = f'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent'
body = json.dumps({'contents': [{'parts': [{'text': prompt}]}],
                   'generationConfig': {'responseModalities': ['IMAGE'], 'imageConfig': {'aspectRatio': '3:2'}}}).encode()
req = urllib.request.Request(url, data=body, headers={'Content-Type': 'application/json', 'x-goog-api-key': key})
try:
    resp = json.load(urllib.request.urlopen(req, timeout=180))
except urllib.error.HTTPError as e:
    raise SystemExit('HTTP %s: %s' % (e.code, e.read().decode(errors='replace')[:400]))
parts = resp.get('candidates', [{}])[0].get('content', {}).get('parts', [])
data = next((p['inlineData']['data'] for p in parts if 'inlineData' in p), None)
if not data:
    raise SystemExit('no image in response: ' + json.dumps(resp)[:400])
open(out, 'wb').write(base64.b64decode(data))
usage = resp.get('usageMetadata', {})
print(out, os.path.getsize(out), 'bytes; tokens', usage.get('totalTokenCount'))
