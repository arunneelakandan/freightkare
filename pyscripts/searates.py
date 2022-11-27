import requests
from bs4 import BeautifulSoup
import json
URL = "https://www.searates.com/maritime"
l = []
page = requests.get(URL)
soup = BeautifulSoup(page.content, "html.parser")
results = soup.find_all("ul", class_="countries")
for iter in results:
    countries = iter.find_all("li", class_="col-xs-6 col-md-3")
    for country in countries:
        c = country.text
        country_link = country.find("a")

        if "href" in country_link.attrs:
            url = (
                f'https://www.searates.com{country_link.get("href")}'
            )
            d = {"country": c, "url": url, "ports": []}
            ports_req = requests.get(url)
            soup_ports = BeautifulSoup(
                ports_req.content, "html.parser"
            )
            ports_content = soup_ports.find_all("ul", class_="ports")
            for __iter in ports_content:
                ports = __iter.find_all(
                    "li", class_="col-xs-6 col-md-3"
                )
                for port in ports:
                    p = port.text
                    port_link = port.find("a")
                    if "href" in port_link.attrs:
                        d["ports"].append(
                            {"port": p, "url": port_link.get("href")}
                        )
            l.append(d)

json_object = json.dumps(l, indent = 4)
with open("sample.json", "w") as outfile:
    outfile.write(json_object)
