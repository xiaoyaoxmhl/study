#### sql注入
* 早期后端程序员是根据sql + 用户的输入拼接最终sql,进行查询
    - ```select * from users where username = 'xxx' or 1=1```
    - 以上sql 用于完全根据用户输入拼接,会查询到过多数据
* 使用mysql的驱动包
    - 其中有对于数据的预编译机制
    - ```db.q('select * from users where usename = ?',['xxx or 1=1'])```
    - mysq会讲起作为转换,如果存在多余的引号之类的,会转换为 \'



#### session配置

![52777463987](assets/1527774639878.png)