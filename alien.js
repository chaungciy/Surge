/**
 * @param {object} $request - Surge request object
 * @returns {object} - Modified request object
 */
function tiggerRequest(request) {
  if (request.body) {
    try {
      // 尝试解析请求体为 JSON 对象
      let body = JSON.parse(request.body);

      // 检查是否存在 tools 字段并将其置空（设置为空数组 [] 或 null，视API要求而定）
      if (body.tools !== undefined) {
        body.tools = null; // 或者 body.tools = [] 
      }

      // 将修改后的 JSON 对象转换回字符串
      request.body = JSON.stringify(body);

      // 注意：修改 body 后，需要手动更新 Content-Length header
      // Surge 1.1.12 的文档提到，特定的HTTP头字段不可修改，包括 Content-Length。Surge 会自动处理。
      // 所以通常不需要手动修改 Content-Length。

    } catch (e) {
      console.error("Error parsing or modifying JSON body: " + e.message);
    }
  }

  // 返回修改后的请求对象
  return request;
}
