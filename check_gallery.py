import re
from html.parser import HTMLParser
html = open('index.html', encoding='utf-8').read()
html_no = re.sub(r'<!--.*?-->', '', html, flags=re.S)
class C(HTMLParser):
    VOID = {'img','br','hr','input','meta','link','source','area','base','col','embed','track','wbr'}
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.errors = []
        self.ids = {}
    def handle_starttag(self, tag, attrs):
        if tag in self.VOID: return
        d = dict(attrs)
        self.ids.setdefault(d.get('id'), []).append(tag)
        self.stack.append((tag, d.get('id')))
    def handle_endtag(self, tag):
        if tag in self.VOID: return
        if not self.stack:
            self.errors.append('extra </%s>' % tag); return
        t, i = self.stack.pop()
        if t != tag:
            self.errors.append('mismatch <%s> vs </%s>' % (t, tag))
c = C(); c.feed(html_no)
print('TAG UNCLOSED:', c.stack)
print('TAG ERRORS:', c.errors)
print('ID COUNT:', len(c.ids))
dups = [k for k,v in c.ids.items() if len(v)>1]
print('DUP IDS:', dups)
