import re
import requests
#href="/catalog

amp_file = open("prism2.html", mode="r", encoding="utf-8")
amp_file2 = open("temp.html", mode="w", encoding="utf-8")

pattern1 = '(href|src)="\/(\w)'
pattern1r = r'\1="https://www.att.com/\2'

pattern2 = '<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>'

resp1 = amp_file.read()
resp2 = re.sub(pattern2,'', resp1)
# resp2 = re.findall('(href|src)="\/(\w)', resp1)

# print(resp2[0], resp2[1])
amp_file2.write(resp2)
print("Complete")