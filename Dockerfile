# 指定镜像和版本
FROM node:10.8.0
# 镜像创建者
LABEL name="dph"

# 将根目录下的文件都copy到container文件系统的app文件夹下
ADD . /app1/
# cd app
WORKDIR /app1

# 安装依赖
RUN npm i
RUN npm build

# 配置环境变量
ENV HOST 0.0.0.0
ENV PORT 8000

# 容器对外暴露的端口号
EXPOSE 8080

# 容器启动是执行的命令，类似npm run start
CMD [ "npm", "dist" ]
