# json-file-divider

대용량 json 파일을 여러개의 json 파일로 분리하기 위한 툴입니다.  
json-separator is a tool to divide huge single json file into multiple smaller json files

데이터를 바이트 단위로 파일에서 불러와 json 형식으로 변환합니다.  
It will load data byte by byte from file. and convert to json

# Usage

```
Usage: index [options] <path>

Arguments:
  path                    source json file path

Options:
  --out-name <file_name>  output file name. sequence will be appended (e.g.
                          <file_name>1.json, <file_name>2.json) (default: "output")
  --count <count>         number of json documents to be stored in the same file
                          (default: 1000)
  -h, --help              display help for command
```
