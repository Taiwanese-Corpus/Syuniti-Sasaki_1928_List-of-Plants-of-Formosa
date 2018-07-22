# 台灣植物名彙(List of Plants of Formosa) 佐佐木舜一（Syuniti-Sasaki） 1928 
[![Build Status](https://travis-ci.org/Taiwanese-Corpus/Syuniti-Sasaki_1928_List-of-Plants-of-Formosa.svg?branch=master)](https://travis-ci.org/Taiwanese-Corpus/Syuniti-Sasaki_1928_List-of-Plants-of-Formosa)

## 數位化版本
- [ChhoeTaigi計劃](https://github.com/ChhoeTaigi/ChhoeTaigiDatabase#9-%E5%8F%B0%E7%81%A3%E6%A4%8D%E7%89%A9%E5%90%8D%E5%BD%99)
```
【台灣植物名彙】
原作者：佐佐木舜一
數位化kap編修：Lîm Bûn-cheng、Tēⁿ Tì-têng、Tân Kim-hoa、Chiúⁿ Ji̍t-êng
以 姓名標示-Sio-kâng方式分享 4.0 國際 (CC BY-SA 4.0) 授權
https://creativecommons.org/licenses/by-sa/4.0/deed.zh_TW
```

## 原網站鏡像指令
```
wget -r -l inf --page-requisites --no-parent --convert-links --adjust-extension  --reject='mowt.asp','Tgb.asp' http://ip194097.ntcu.edu.tw/memory/TGB/thak.asp?id=59
rename 's/_.*_/_頁面_/g' ip194097.ntcu.edu.tw/memory/TGB/data/TOSBBL/*
find ip194097.ntcu.edu.tw/ -name '*html' -exec bash -c "iconv -f big5 -t utf8 '{}' > a.html && mv a.html '{}'" \;
find ip194097.ntcu.edu.tw/ -name '*html' -exec sed 's/big5/utf-8/g' -i {} \;
```
鏡像站：[gh-pages](https://taiwanese-corpus.github.io/Syuniti-Sasaki_1928_List-of-Plants-of-Formosa/memory/TGB/thak.asp%3Fid=59.html)
