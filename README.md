# output_file_path
一个通过nodejs fs文件系统来获取指定文件夹内所有文件路径的小工具。可以自定义输出路径。输出为json字符串可以直接作为preload.js预加载文件列表使用。

# 使用方法
将 output_file_path.js 文件复制到你获取的文件夹的同级目录下

命令行运行 node output_file_path.js https://www.xx.com(或者useRlt) images js

运行命令时需要带有两个以上参数，第一个参数（必须）自定义根路径或者使用相对路径 如果使用相对路径则传‘useRlt’。从后面第二个参数开始则为文件夹名称可以有多个文件夹。参数以空格分隔。

# 注意事项

在使用时 output_file_path.js 一定要与目标文件夹同级存放。

# 输出文件
输出文件为一个text 文件 （file_name_json.text）

格式： [{"src":"./images/child_dir/pic1.png","id":"file0"},{"src":"./images/child_dir/pic2.png","id":"file1"},{"src":"./images/pic1.png","id":"file2"},{"src":"./images/pic2.png","id":"file3"},{"src":"./js/jquery.min.js","id":"file4"},{"src":"./js/preloadjs.min.js","id":"file5"}] 