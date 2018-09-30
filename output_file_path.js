//引用文件系统模块
var fs = require('fs');

function outPutFilePath() {
    this.nodeArgs = process.argv.splice(2); //获取运行命令时所传的参数
    if (this.nodeArgs.length == 0) {
        console.error('未找到处理参数 举例 命令行运行 node output_file_path.js https://www.xx.com(或者useRlt) images js css lib ...');
        return;
    };
    this.trueDir = this.nodeArgs[0] == 'useRlt' ? './' : this.nodeArgs[0]; //第一个参数 需要替换的路劲如果是useRlt 则用默认的相对路径
    this.args = this.nodeArgs.slice(1); //需要读取的文件夹的名字
    this.init();
}

outPutFilePath.prototype = {
    constructor: outPutFilePath,
    init: function() {
        this.getFileList();
    },
    readFileList: function(filepath, filesList) {
        try {
            var self = this,
                files = fs.readdirSync(filepath);
            files.forEach(function(itm, index) {
                var stat = fs.statSync(filepath + itm);
                if (stat.isDirectory()) {
                    //递归读取文件
                    self.readFileList(filepath + itm + "/", filesList)
                } else {
                    var obj = {};
                    obj.src = (filepath + itm).replace(__dirname + '/', self.trueDir);
                    obj.id = 'file' + (filesList.length);
                    filesList.push(obj);
                }
            })
        } catch (e) {
            console.error(e)
        }
    },
    getFileList: function() {
        var filesList = [];
        try {
            if (this.args.length > 0) { //判断是否存在要读取的文件夹名称参数
                for (var i = 0; i < this.args.length; i++) { //遍历要读取的文件夹名称并获取到每个文件夹路径
                    var dirpath, stat;
                    dirpath = __dirname + '/' + this.args[i] + '/';
                    if (fs.existsSync(dirpath)) { //判断该路径是否真的存在 如果不存在则返回并提示错误
                        stat = fs.statSync(dirpath);
                        if (stat.isDirectory()) { //判断是否为文件夹
                            this.readFileList(dirpath, filesList);
                        } else {
                            console.error('输入的参数中包含非文件夹名称');
                            return;
                        }
                    } else {
                        console.error('未找到' + this.args[i] + '文件夹');
                        return;
                    }
                };
                this.writeFile(filesList); //输出列表到text文件中
            } else {
                console.error("未指需要读取的文件夹名称， 举例 命令行运行 node output_file_path.js https://www.xx.com(或者useRlt) images js css lib ...")
                return;
            }
        } catch (e) {
            console.error(e)
        }
    },
    writeFile: function(filesList) {
        try {
            if (fs.existsSync('./file_name_json.text')) {
                fs.unlinkSync('./file_name_json.text');
            };
            fs.writeFileSync('./file_name_json.text', JSON.stringify(filesList));
            console.log('已完成')
        } catch (e) {
            console.error(e)
        }
    }
}

;
(function() {
    var oph = new outPutFilePath();
})()

// 用于获取所传入文件夹内文件的相对路径  需要传递的参数 参数1 自定义实际生产环境文件所在路径（通常为网络路径，如果页面与资源在同一域名下部署，也可以用相对路径 传入useRlt将使用默认相对路径） 参数2 -> n 要读取的文件夹名称
// 举例 命令行运行 node output_file_path.js http://www.xx.com(或者useRlt) images js css lib ...
// 用于网页资源加载图片等资源较多时自动获取文件路径并自动转换为需要的文件路径
// 要注意的是服务端部署的时候资源路径最好统一存放，同时如果资源文件夹内任然还有子文件夹不能修改或者删除子文件夹否则会改变内部文件路径。（建议不要有太多的子文件夹）
// 请将该js文件与要获取的文件夹同级存放
