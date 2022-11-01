import requests
import re

url = "https://g1.globo.com/?utm_source=globo.com&utm_medium=header/"

check = set()
r = requests.get(url)
html = r.text.encode("utf8")
search = re.findall(r'<a href=[\'"?](https[://\w\-._]+)', html.decode("utf8"))

for link in search:
    if link not in check:
        with open("link.txt","a") as file:
            file.write(f'{link}\n')
    check.add(link)

