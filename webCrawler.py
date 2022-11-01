'''
        THIS IS ONE WAY TO DO

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
'''

'''    LET'S TRY ANOTHER WAY '''

from urllib.request import urlopen
from bs4 import BeautifulSoup as soup
import re


url = urlopen("https://g1.globo.com/?utm_source=globo.com&utm_medium=header/")
bsobj = soup(url.read(), features="html.parser")

caching = set()
for link in bsobj.findAll('a'):
    if 'href' in link.attrs and link.attrs['href'] not in caching:
        print(link.attrs['href'])
        caching.add(link.attrs['href'])
