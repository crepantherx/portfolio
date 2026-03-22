import re

with open('article.html', 'r', encoding='utf-8') as f:
    article_html = f.read()

with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# Add template to index.html
template_html = f'\n<!-- ARTICLE TEMPLATE -->\n<template id="article-content-template">\n{article_html}\n</template>\n'

index_html = index_html.replace('</body>', template_html + '</body>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index_html)
