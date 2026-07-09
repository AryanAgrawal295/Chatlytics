/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/analyze/route";
exports.ids = ["app/api/analyze/route"];
exports.modules = {

/***/ "(rsc)/./app/api/analyze/route.ts":
/*!**********************************!*\
  !*** ./app/api/analyze/route.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_retriever__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/retriever */ \"(rsc)/./lib/retriever.ts\");\n/* harmony import */ var _lib_promptBuilder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/promptBuilder */ \"(rsc)/./lib/promptBuilder.ts\");\n/* harmony import */ var _lib_gemini__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/gemini */ \"(rsc)/./lib/gemini.ts\");\n\n\n\n\nfunction cleanAnswerPrefix(answer) {\n    return answer.trim().replace(/^based on (?:the )?(?:provided )?(?:conversation )?(?:segments|context)(?: provided)?\\s*[:,.-]?\\s*/i, \"\");\n}\nasync function POST(req) {\n    try {\n        const { question, transcriptId, userId } = await req.json();\n        if (!question || !transcriptId || !userId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"question, transcriptId, and userId are required\"\n            }, {\n                status: 400\n            });\n        }\n        // ── Step 1: Retrieve + re-rank relevant chunks ─────────────────────────\n        const chunks = await (0,_lib_retriever__WEBPACK_IMPORTED_MODULE_1__.retrieveAndRank)(question, transcriptId, userId, 5);\n        if (chunks.length === 0) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                answer: \"No relevant conversation context found for this question. Please make sure the transcript was uploaded successfully.\",\n                chunksUsed: 0\n            });\n        }\n        // ── Step 2: Build grounded prompt with full signals ────────────────────\n        const prompt = (0,_lib_promptBuilder__WEBPACK_IMPORTED_MODULE_2__.buildAnalysisPrompt)(question, chunks);\n        // ── Step 3: Generate answer ────────────────────────────────────────────\n        const answer = cleanAnswerPrefix(await (0,_lib_gemini__WEBPACK_IMPORTED_MODULE_3__.generateText)(prompt));\n        // ── Step 4: Return answer with debug metadata ──────────────────────────\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            answer,\n            chunksUsed: chunks.length,\n            debug: {\n                topChunkSummaries: chunks.map((c)=>c.topicSummary),\n                emotionsInContext: [\n                    ...new Set(chunks.map((c)=>c.emotion))\n                ],\n                intentsInContext: [\n                    ...new Set(chunks.map((c)=>c.intent))\n                ]\n            }\n        });\n    } catch (error) {\n        console.error(\"[ANALYZE ERROR]\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to analyze transcript\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FuYWx5emUvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBdUQ7QUFDTjtBQUNRO0FBQ2Q7QUFFM0MsU0FBU0ksa0JBQWtCQyxNQUFjO0lBQ3ZDLE9BQU9BLE9BQ0pDLElBQUksR0FDSkMsT0FBTyxDQUNOLHVHQUNBO0FBRU47QUFFTyxlQUFlQyxLQUFLQyxHQUFnQjtJQUN6QyxJQUFJO1FBQ0YsTUFBTSxFQUFFQyxRQUFRLEVBQUVDLFlBQVksRUFBRUMsTUFBTSxFQUFFLEdBQUcsTUFBTUgsSUFBSUksSUFBSTtRQUV6RCxJQUFJLENBQUNILFlBQVksQ0FBQ0MsZ0JBQWdCLENBQUNDLFFBQVE7WUFDekMsT0FBT1oscURBQVlBLENBQUNhLElBQUksQ0FDdEI7Z0JBQUVDLE9BQU87WUFBa0QsR0FDM0Q7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLDBFQUEwRTtRQUMxRSxNQUFNQyxTQUFTLE1BQU1mLCtEQUFlQSxDQUFDUyxVQUFVQyxjQUFjQyxRQUFRO1FBRXJFLElBQUlJLE9BQU9DLE1BQU0sS0FBSyxHQUFHO1lBQ3ZCLE9BQU9qQixxREFBWUEsQ0FBQ2EsSUFBSSxDQUFDO2dCQUN2QlIsUUFBUTtnQkFDUmEsWUFBWTtZQUNkO1FBQ0Y7UUFFQSwwRUFBMEU7UUFDMUUsTUFBTUMsU0FBU2pCLHVFQUFtQkEsQ0FBQ1EsVUFBVU07UUFFN0MsMEVBQTBFO1FBQzFFLE1BQU1YLFNBQVNELGtCQUFrQixNQUFNRCx5REFBWUEsQ0FBQ2dCO1FBRXBELDBFQUEwRTtRQUMxRSxPQUFPbkIscURBQVlBLENBQUNhLElBQUksQ0FBQztZQUN2QlI7WUFDQWEsWUFBWUYsT0FBT0MsTUFBTTtZQUN6QkcsT0FBTztnQkFDTEMsbUJBQW1CTCxPQUFPTSxHQUFHLENBQUMsQ0FBQ0MsSUFBTUEsRUFBRUMsWUFBWTtnQkFDbkRDLG1CQUFtQjt1QkFBSSxJQUFJQyxJQUFJVixPQUFPTSxHQUFHLENBQUMsQ0FBQ0MsSUFBTUEsRUFBRUksT0FBTztpQkFBRztnQkFDN0RDLGtCQUFrQjt1QkFBSSxJQUFJRixJQUFJVixPQUFPTSxHQUFHLENBQUMsQ0FBQ0MsSUFBTUEsRUFBRU0sTUFBTTtpQkFBRztZQUM3RDtRQUNGO0lBQ0YsRUFBRSxPQUFPZixPQUFPO1FBQ2RnQixRQUFRaEIsS0FBSyxDQUFDLG1CQUFtQkE7UUFDakMsT0FBT2QscURBQVlBLENBQUNhLElBQUksQ0FDdEI7WUFBRUMsT0FBTztRQUErQixHQUN4QztZQUFFQyxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxIUFxcRGVza3RvcFxcd2ViIGRldlxcQ2hhdGx5dGljc1xcYXBwXFxhcGlcXGFuYWx5emVcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIlxyXG5pbXBvcnQgeyByZXRyaWV2ZUFuZFJhbmsgfSBmcm9tIFwiQC9saWIvcmV0cmlldmVyXCJcclxuaW1wb3J0IHsgYnVpbGRBbmFseXNpc1Byb21wdCB9IGZyb20gXCJAL2xpYi9wcm9tcHRCdWlsZGVyXCJcclxuaW1wb3J0IHsgZ2VuZXJhdGVUZXh0IH0gZnJvbSBcIkAvbGliL2dlbWluaVwiXHJcblxyXG5mdW5jdGlvbiBjbGVhbkFuc3dlclByZWZpeChhbnN3ZXI6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIGFuc3dlclxyXG4gICAgLnRyaW0oKVxyXG4gICAgLnJlcGxhY2UoXHJcbiAgICAgIC9eYmFzZWQgb24gKD86dGhlICk/KD86cHJvdmlkZWQgKT8oPzpjb252ZXJzYXRpb24gKT8oPzpzZWdtZW50c3xjb250ZXh0KSg/OiBwcm92aWRlZCk/XFxzKls6LC4tXT9cXHMqL2ksXHJcbiAgICAgIFwiXCJcclxuICAgIClcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBOZXh0UmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB7IHF1ZXN0aW9uLCB0cmFuc2NyaXB0SWQsIHVzZXJJZCB9ID0gYXdhaXQgcmVxLmpzb24oKVxyXG5cclxuICAgIGlmICghcXVlc3Rpb24gfHwgIXRyYW5zY3JpcHRJZCB8fCAhdXNlcklkKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IGVycm9yOiBcInF1ZXN0aW9uLCB0cmFuc2NyaXB0SWQsIGFuZCB1c2VySWQgYXJlIHJlcXVpcmVkXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAwIH1cclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOKUgOKUgCBTdGVwIDE6IFJldHJpZXZlICsgcmUtcmFuayByZWxldmFudCBjaHVua3Mg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXHJcbiAgICBjb25zdCBjaHVua3MgPSBhd2FpdCByZXRyaWV2ZUFuZFJhbmsocXVlc3Rpb24sIHRyYW5zY3JpcHRJZCwgdXNlcklkLCA1KVxyXG5cclxuICAgIGlmIChjaHVua3MubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XHJcbiAgICAgICAgYW5zd2VyOiBcIk5vIHJlbGV2YW50IGNvbnZlcnNhdGlvbiBjb250ZXh0IGZvdW5kIGZvciB0aGlzIHF1ZXN0aW9uLiBQbGVhc2UgbWFrZSBzdXJlIHRoZSB0cmFuc2NyaXB0IHdhcyB1cGxvYWRlZCBzdWNjZXNzZnVsbHkuXCIsXHJcbiAgICAgICAgY2h1bmtzVXNlZDogMCxcclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyDilIDilIAgU3RlcCAyOiBCdWlsZCBncm91bmRlZCBwcm9tcHQgd2l0aCBmdWxsIHNpZ25hbHMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXHJcbiAgICBjb25zdCBwcm9tcHQgPSBidWlsZEFuYWx5c2lzUHJvbXB0KHF1ZXN0aW9uLCBjaHVua3MpXHJcblxyXG4gICAgLy8g4pSA4pSAIFN0ZXAgMzogR2VuZXJhdGUgYW5zd2VyIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxyXG4gICAgY29uc3QgYW5zd2VyID0gY2xlYW5BbnN3ZXJQcmVmaXgoYXdhaXQgZ2VuZXJhdGVUZXh0KHByb21wdCkpXHJcblxyXG4gICAgLy8g4pSA4pSAIFN0ZXAgNDogUmV0dXJuIGFuc3dlciB3aXRoIGRlYnVnIG1ldGFkYXRhIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcclxuICAgICAgYW5zd2VyLFxyXG4gICAgICBjaHVua3NVc2VkOiBjaHVua3MubGVuZ3RoLFxyXG4gICAgICBkZWJ1Zzoge1xyXG4gICAgICAgIHRvcENodW5rU3VtbWFyaWVzOiBjaHVua3MubWFwKChjKSA9PiBjLnRvcGljU3VtbWFyeSksXHJcbiAgICAgICAgZW1vdGlvbnNJbkNvbnRleHQ6IFsuLi5uZXcgU2V0KGNodW5rcy5tYXAoKGMpID0+IGMuZW1vdGlvbikpXSxcclxuICAgICAgICBpbnRlbnRzSW5Db250ZXh0OiBbLi4ubmV3IFNldChjaHVua3MubWFwKChjKSA9PiBjLmludGVudCkpXSxcclxuICAgICAgfSxcclxuICAgIH0pXHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJbQU5BTFlaRSBFUlJPUl1cIiwgZXJyb3IpXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgIHsgZXJyb3I6IFwiRmFpbGVkIHRvIGFuYWx5emUgdHJhbnNjcmlwdFwiIH0sXHJcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgKVxyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwicmV0cmlldmVBbmRSYW5rIiwiYnVpbGRBbmFseXNpc1Byb21wdCIsImdlbmVyYXRlVGV4dCIsImNsZWFuQW5zd2VyUHJlZml4IiwiYW5zd2VyIiwidHJpbSIsInJlcGxhY2UiLCJQT1NUIiwicmVxIiwicXVlc3Rpb24iLCJ0cmFuc2NyaXB0SWQiLCJ1c2VySWQiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJjaHVua3MiLCJsZW5ndGgiLCJjaHVua3NVc2VkIiwicHJvbXB0IiwiZGVidWciLCJ0b3BDaHVua1N1bW1hcmllcyIsIm1hcCIsImMiLCJ0b3BpY1N1bW1hcnkiLCJlbW90aW9uc0luQ29udGV4dCIsIlNldCIsImVtb3Rpb24iLCJpbnRlbnRzSW5Db250ZXh0IiwiaW50ZW50IiwiY29uc29sZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/analyze/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/embedder.ts":
/*!*************************!*\
  !*** ./lib/embedder.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   embedChunks: () => (/* binding */ embedChunks),\n/* harmony export */   embedText: () => (/* binding */ embedText)\n/* harmony export */ });\n/* harmony import */ var _google_genai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @google/genai */ \"(rsc)/./node_modules/@google/genai/dist/node/index.mjs\");\n\nconst ai = new _google_genai__WEBPACK_IMPORTED_MODULE_0__.GoogleGenAI({\n    apiKey: process.env.GEMINI_API_KEY\n});\n// Embed a single text (used for query embedding at retrieval time)\nasync function embedText(text) {\n    const response = await ai.models.embedContent({\n        model: \"gemini-embedding-2\",\n        contents: text,\n        config: {\n            outputDimensionality: 768\n        }\n    });\n    return response.embeddings[0].values;\n}\n// Embed the CONTEXTUAL text of each chunk\n// contextualText = history prefix + intent/emotion tags + raw chunk\n// This means the vector captures WHERE in the conversation this chunk sits\nasync function embedChunks(contextualTexts) {\n    const embeddings = [];\n    for (const text of contextualTexts){\n        const embedding = await embedText(text);\n        embeddings.push(embedding);\n        await new Promise((r)=>setTimeout(r, 150));\n    }\n    return embeddings;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZW1iZWRkZXIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTJDO0FBRTNDLE1BQU1DLEtBQUssSUFBSUQsc0RBQVdBLENBQUM7SUFDekJFLFFBQVFDLFFBQVFDLEdBQUcsQ0FBQ0MsY0FBYztBQUNwQztBQUVBLG1FQUFtRTtBQUM1RCxlQUFlQyxVQUFVQyxJQUFZO0lBQzFDLE1BQU1DLFdBQVcsTUFBTVAsR0FBR1EsTUFBTSxDQUFDQyxZQUFZLENBQUM7UUFDNUNDLE9BQU87UUFDUEMsVUFBVUw7UUFDVk0sUUFBUTtZQUNOQyxzQkFBc0I7UUFDeEI7SUFDRjtJQUVBLE9BQU9OLFNBQVNPLFVBQVUsQ0FBRSxFQUFFLENBQUNDLE1BQU07QUFDdkM7QUFFQSwwQ0FBMEM7QUFDMUMsb0VBQW9FO0FBQ3BFLDJFQUEyRTtBQUNwRSxlQUFlQyxZQUNwQkMsZUFBeUI7SUFFekIsTUFBTUgsYUFBeUIsRUFBRTtJQUVqQyxLQUFLLE1BQU1SLFFBQVFXLGdCQUFpQjtRQUNsQyxNQUFNQyxZQUFZLE1BQU1iLFVBQVVDO1FBQ2xDUSxXQUFXSyxJQUFJLENBQUNEO1FBQ2hCLE1BQU0sSUFBSUUsUUFBUSxDQUFDQyxJQUFNQyxXQUFXRCxHQUFHO0lBQ3pDO0lBRUEsT0FBT1A7QUFDVCIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxIUFxcRGVza3RvcFxcd2ViIGRldlxcQ2hhdGx5dGljc1xcbGliXFxlbWJlZGRlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHb29nbGVHZW5BSSB9IGZyb20gXCJAZ29vZ2xlL2dlbmFpXCJcclxuXHJcbmNvbnN0IGFpID0gbmV3IEdvb2dsZUdlbkFJKHtcclxuICBhcGlLZXk6IHByb2Nlc3MuZW52LkdFTUlOSV9BUElfS0VZISxcclxufSlcclxuXHJcbi8vIEVtYmVkIGEgc2luZ2xlIHRleHQgKHVzZWQgZm9yIHF1ZXJ5IGVtYmVkZGluZyBhdCByZXRyaWV2YWwgdGltZSlcclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGVtYmVkVGV4dCh0ZXh0OiBzdHJpbmcpOiBQcm9taXNlPG51bWJlcltdPiB7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhaS5tb2RlbHMuZW1iZWRDb250ZW50KHtcclxuICAgIG1vZGVsOiBcImdlbWluaS1lbWJlZGRpbmctMlwiLFxyXG4gICAgY29udGVudHM6IHRleHQsXHJcbiAgICBjb25maWc6IHtcclxuICAgICAgb3V0cHV0RGltZW5zaW9uYWxpdHk6IDc2OCxcclxuICAgIH0sXHJcbiAgfSlcclxuXHJcbiAgcmV0dXJuIHJlc3BvbnNlLmVtYmVkZGluZ3MhWzBdLnZhbHVlcyFcclxufVxyXG5cclxuLy8gRW1iZWQgdGhlIENPTlRFWFRVQUwgdGV4dCBvZiBlYWNoIGNodW5rXHJcbi8vIGNvbnRleHR1YWxUZXh0ID0gaGlzdG9yeSBwcmVmaXggKyBpbnRlbnQvZW1vdGlvbiB0YWdzICsgcmF3IGNodW5rXHJcbi8vIFRoaXMgbWVhbnMgdGhlIHZlY3RvciBjYXB0dXJlcyBXSEVSRSBpbiB0aGUgY29udmVyc2F0aW9uIHRoaXMgY2h1bmsgc2l0c1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZW1iZWRDaHVua3MoXHJcbiAgY29udGV4dHVhbFRleHRzOiBzdHJpbmdbXVxyXG4pOiBQcm9taXNlPG51bWJlcltdW10+IHtcclxuICBjb25zdCBlbWJlZGRpbmdzOiBudW1iZXJbXVtdID0gW11cclxuXHJcbiAgZm9yIChjb25zdCB0ZXh0IG9mIGNvbnRleHR1YWxUZXh0cykge1xyXG4gICAgY29uc3QgZW1iZWRkaW5nID0gYXdhaXQgZW1iZWRUZXh0KHRleHQpXHJcbiAgICBlbWJlZGRpbmdzLnB1c2goZW1iZWRkaW5nKVxyXG4gICAgYXdhaXQgbmV3IFByb21pc2UoKHIpID0+IHNldFRpbWVvdXQociwgMTUwKSlcclxuICB9XHJcblxyXG4gIHJldHVybiBlbWJlZGRpbmdzXHJcbn0iXSwibmFtZXMiOlsiR29vZ2xlR2VuQUkiLCJhaSIsImFwaUtleSIsInByb2Nlc3MiLCJlbnYiLCJHRU1JTklfQVBJX0tFWSIsImVtYmVkVGV4dCIsInRleHQiLCJyZXNwb25zZSIsIm1vZGVscyIsImVtYmVkQ29udGVudCIsIm1vZGVsIiwiY29udGVudHMiLCJjb25maWciLCJvdXRwdXREaW1lbnNpb25hbGl0eSIsImVtYmVkZGluZ3MiLCJ2YWx1ZXMiLCJlbWJlZENodW5rcyIsImNvbnRleHR1YWxUZXh0cyIsImVtYmVkZGluZyIsInB1c2giLCJQcm9taXNlIiwiciIsInNldFRpbWVvdXQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/embedder.ts\n");

/***/ }),

/***/ "(rsc)/./lib/gemini.ts":
/*!***********************!*\
  !*** ./lib/gemini.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GEMINI_GENERATION_MODEL: () => (/* binding */ GEMINI_GENERATION_MODEL),\n/* harmony export */   geminiAI: () => (/* binding */ geminiAI),\n/* harmony export */   generateText: () => (/* binding */ generateText)\n/* harmony export */ });\n/* harmony import */ var _google_genai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @google/genai */ \"(rsc)/./node_modules/@google/genai/dist/node/index.mjs\");\n\nconst GEMINI_GENERATION_MODEL = process.env.GEMINI_GENERATION_MODEL || \"gemini-2.5-flash\";\nconst GEMINI_FALLBACK_MODELS = (process.env.GEMINI_FALLBACK_MODELS || \"gemini-2.5-flash-lite\").split(\",\").map((model)=>model.trim()).filter(Boolean);\nconst geminiAI = new _google_genai__WEBPACK_IMPORTED_MODULE_0__.GoogleGenAI({\n    apiKey: process.env.GEMINI_API_KEY\n});\nasync function generateText(prompt, options = {}) {\n    const models = [\n        ...new Set([\n            GEMINI_GENERATION_MODEL,\n            ...GEMINI_FALLBACK_MODELS\n        ])\n    ];\n    let lastError;\n    for (const model of models){\n        try {\n            const response = await geminiAI.models.generateContent({\n                model,\n                contents: prompt,\n                config: {\n                    temperature: options.temperature ?? 0.4\n                }\n            });\n            return response.text || \"\";\n        } catch (error) {\n            lastError = error;\n            const status = error.status;\n            if (status !== 429 && status !== 404) throw error;\n            console.warn(`[GEMINI WARNING] ${model} unavailable; trying next model`);\n        }\n    }\n    throw lastError;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZ2VtaW5pLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBMkM7QUFFcEMsTUFBTUMsMEJBQ1hDLFFBQVFDLEdBQUcsQ0FBQ0YsdUJBQXVCLElBQUksbUJBQWtCO0FBRTNELE1BQU1HLHlCQUF5QixDQUM3QkYsUUFBUUMsR0FBRyxDQUFDQyxzQkFBc0IsSUFBSSx1QkFBc0IsRUFFM0RDLEtBQUssQ0FBQyxLQUNOQyxHQUFHLENBQUMsQ0FBQ0MsUUFBVUEsTUFBTUMsSUFBSSxJQUN6QkMsTUFBTSxDQUFDQztBQUVILE1BQU1DLFdBQVcsSUFBSVgsc0RBQVdBLENBQUM7SUFDdENZLFFBQVFWLFFBQVFDLEdBQUcsQ0FBQ1UsY0FBYztBQUNwQyxHQUFFO0FBRUssZUFBZUMsYUFDcEJDLE1BQWMsRUFDZEMsVUFBb0MsQ0FBQyxDQUFDO0lBRXRDLE1BQU1DLFNBQVM7V0FBSSxJQUFJQyxJQUFJO1lBQUNqQjtlQUE0Qkc7U0FBdUI7S0FBRTtJQUNqRixJQUFJZTtJQUVKLEtBQUssTUFBTVosU0FBU1UsT0FBUTtRQUMxQixJQUFJO1lBQ0YsTUFBTUcsV0FBVyxNQUFNVCxTQUFTTSxNQUFNLENBQUNJLGVBQWUsQ0FBQztnQkFDckRkO2dCQUNBZSxVQUFVUDtnQkFDVlEsUUFBUTtvQkFDTkMsYUFBYVIsUUFBUVEsV0FBVyxJQUFJO2dCQUN0QztZQUNGO1lBRUEsT0FBT0osU0FBU0ssSUFBSSxJQUFJO1FBQzFCLEVBQUUsT0FBT0MsT0FBTztZQUNkUCxZQUFZTztZQUNaLE1BQU1DLFNBQVMsTUFBK0JBLE1BQU07WUFDcEQsSUFBSUEsV0FBVyxPQUFPQSxXQUFXLEtBQUssTUFBTUQ7WUFDNUNFLFFBQVFDLElBQUksQ0FBQyxDQUFDLGlCQUFpQixFQUFFdEIsTUFBTSwrQkFBK0IsQ0FBQztRQUN6RTtJQUNGO0lBRUEsTUFBTVk7QUFDUiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxIUFxcRGVza3RvcFxcd2ViIGRldlxcQ2hhdGx5dGljc1xcbGliXFxnZW1pbmkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR29vZ2xlR2VuQUkgfSBmcm9tIFwiQGdvb2dsZS9nZW5haVwiXHJcblxyXG5leHBvcnQgY29uc3QgR0VNSU5JX0dFTkVSQVRJT05fTU9ERUwgPVxyXG4gIHByb2Nlc3MuZW52LkdFTUlOSV9HRU5FUkFUSU9OX01PREVMIHx8IFwiZ2VtaW5pLTIuNS1mbGFzaFwiXHJcblxyXG5jb25zdCBHRU1JTklfRkFMTEJBQ0tfTU9ERUxTID0gKFxyXG4gIHByb2Nlc3MuZW52LkdFTUlOSV9GQUxMQkFDS19NT0RFTFMgfHwgXCJnZW1pbmktMi41LWZsYXNoLWxpdGVcIlxyXG4pXHJcbiAgLnNwbGl0KFwiLFwiKVxyXG4gIC5tYXAoKG1vZGVsKSA9PiBtb2RlbC50cmltKCkpXHJcbiAgLmZpbHRlcihCb29sZWFuKVxyXG5cclxuZXhwb3J0IGNvbnN0IGdlbWluaUFJID0gbmV3IEdvb2dsZUdlbkFJKHtcclxuICBhcGlLZXk6IHByb2Nlc3MuZW52LkdFTUlOSV9BUElfS0VZISxcclxufSlcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZW5lcmF0ZVRleHQoXHJcbiAgcHJvbXB0OiBzdHJpbmcsXHJcbiAgb3B0aW9uczogeyB0ZW1wZXJhdHVyZT86IG51bWJlciB9ID0ge31cclxuKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICBjb25zdCBtb2RlbHMgPSBbLi4ubmV3IFNldChbR0VNSU5JX0dFTkVSQVRJT05fTU9ERUwsIC4uLkdFTUlOSV9GQUxMQkFDS19NT0RFTFNdKV1cclxuICBsZXQgbGFzdEVycm9yOiB1bmtub3duXHJcblxyXG4gIGZvciAoY29uc3QgbW9kZWwgb2YgbW9kZWxzKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGdlbWluaUFJLm1vZGVscy5nZW5lcmF0ZUNvbnRlbnQoe1xyXG4gICAgICAgIG1vZGVsLFxyXG4gICAgICAgIGNvbnRlbnRzOiBwcm9tcHQsXHJcbiAgICAgICAgY29uZmlnOiB7XHJcbiAgICAgICAgICB0ZW1wZXJhdHVyZTogb3B0aW9ucy50ZW1wZXJhdHVyZSA/PyAwLjQsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSlcclxuXHJcbiAgICAgIHJldHVybiByZXNwb25zZS50ZXh0IHx8IFwiXCJcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGxhc3RFcnJvciA9IGVycm9yXHJcbiAgICAgIGNvbnN0IHN0YXR1cyA9IChlcnJvciBhcyB7IHN0YXR1cz86IG51bWJlciB9KS5zdGF0dXNcclxuICAgICAgaWYgKHN0YXR1cyAhPT0gNDI5ICYmIHN0YXR1cyAhPT0gNDA0KSB0aHJvdyBlcnJvclxyXG4gICAgICBjb25zb2xlLndhcm4oYFtHRU1JTkkgV0FSTklOR10gJHttb2RlbH0gdW5hdmFpbGFibGU7IHRyeWluZyBuZXh0IG1vZGVsYClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRocm93IGxhc3RFcnJvclxyXG59XHJcbiJdLCJuYW1lcyI6WyJHb29nbGVHZW5BSSIsIkdFTUlOSV9HRU5FUkFUSU9OX01PREVMIiwicHJvY2VzcyIsImVudiIsIkdFTUlOSV9GQUxMQkFDS19NT0RFTFMiLCJzcGxpdCIsIm1hcCIsIm1vZGVsIiwidHJpbSIsImZpbHRlciIsIkJvb2xlYW4iLCJnZW1pbmlBSSIsImFwaUtleSIsIkdFTUlOSV9BUElfS0VZIiwiZ2VuZXJhdGVUZXh0IiwicHJvbXB0Iiwib3B0aW9ucyIsIm1vZGVscyIsIlNldCIsImxhc3RFcnJvciIsInJlc3BvbnNlIiwiZ2VuZXJhdGVDb250ZW50IiwiY29udGVudHMiLCJjb25maWciLCJ0ZW1wZXJhdHVyZSIsInRleHQiLCJlcnJvciIsInN0YXR1cyIsImNvbnNvbGUiLCJ3YXJuIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/gemini.ts\n");

/***/ }),

/***/ "(rsc)/./lib/pinecone.ts":
/*!*************************!*\
  !*** ./lib/pinecone.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getPineconeIndex: () => (/* binding */ getPineconeIndex)\n/* harmony export */ });\n/* harmony import */ var _pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pinecone-database/pinecone */ \"(rsc)/./node_modules/@pinecone-database/pinecone/dist/index.js\");\n/* harmony import */ var _pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0__);\n\nlet pinecone = null;\nfunction requireEnv(name) {\n    const value = process.env[name];\n    if (!value) {\n        throw new Error(`${name} is required`);\n    }\n    return value;\n}\nfunction getPineconeIndex() {\n    if (!pinecone) {\n        pinecone = new _pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0__.Pinecone({\n            apiKey: requireEnv(\"PINECONE_API_KEY\")\n        });\n    }\n    return pinecone.index(requireEnv(\"PINECONE_INDEX_NAME\"));\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcGluZWNvbmUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXNEO0FBRXRELElBQUlDLFdBQTRCO0FBRWhDLFNBQVNDLFdBQVdDLElBQVk7SUFDOUIsTUFBTUMsUUFBUUMsUUFBUUMsR0FBRyxDQUFDSCxLQUFLO0lBQy9CLElBQUksQ0FBQ0MsT0FBTztRQUNWLE1BQU0sSUFBSUcsTUFBTSxHQUFHSixLQUFLLFlBQVksQ0FBQztJQUN2QztJQUNBLE9BQU9DO0FBQ1Q7QUFFTyxTQUFTSTtJQUNkLElBQUksQ0FBQ1AsVUFBVTtRQUNiQSxXQUFXLElBQUlELGlFQUFRQSxDQUFDO1lBQ3RCUyxRQUFRUCxXQUFXO1FBQ3JCO0lBQ0Y7SUFFQSxPQUFPRCxTQUFTUyxLQUFLLENBQUNSLFdBQVc7QUFDbkMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcSFBcXERlc2t0b3BcXHdlYiBkZXZcXENoYXRseXRpY3NcXGxpYlxccGluZWNvbmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGluZWNvbmUgfSBmcm9tIFwiQHBpbmVjb25lLWRhdGFiYXNlL3BpbmVjb25lXCJcclxuXHJcbmxldCBwaW5lY29uZTogUGluZWNvbmUgfCBudWxsID0gbnVsbFxyXG5cclxuZnVuY3Rpb24gcmVxdWlyZUVudihuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGNvbnN0IHZhbHVlID0gcHJvY2Vzcy5lbnZbbmFtZV1cclxuICBpZiAoIXZhbHVlKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7bmFtZX0gaXMgcmVxdWlyZWRgKVxyXG4gIH1cclxuICByZXR1cm4gdmFsdWVcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFBpbmVjb25lSW5kZXgoKSB7XHJcbiAgaWYgKCFwaW5lY29uZSkge1xyXG4gICAgcGluZWNvbmUgPSBuZXcgUGluZWNvbmUoe1xyXG4gICAgICBhcGlLZXk6IHJlcXVpcmVFbnYoXCJQSU5FQ09ORV9BUElfS0VZXCIpLFxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHJldHVybiBwaW5lY29uZS5pbmRleChyZXF1aXJlRW52KFwiUElORUNPTkVfSU5ERVhfTkFNRVwiKSlcclxufVxyXG4iXSwibmFtZXMiOlsiUGluZWNvbmUiLCJwaW5lY29uZSIsInJlcXVpcmVFbnYiLCJuYW1lIiwidmFsdWUiLCJwcm9jZXNzIiwiZW52IiwiRXJyb3IiLCJnZXRQaW5lY29uZUluZGV4IiwiYXBpS2V5IiwiaW5kZXgiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/pinecone.ts\n");

/***/ }),

/***/ "(rsc)/./lib/promptBuilder.ts":
/*!******************************!*\
  !*** ./lib/promptBuilder.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   buildAnalysisPrompt: () => (/* binding */ buildAnalysisPrompt)\n/* harmony export */ });\nfunction buildAnalysisPrompt(question, chunks) {\n    // Sort chunks by their position in conversation for natural flow\n    const ordered = [\n        ...chunks\n    ].sort((a, b)=>a.turnIndex - b.turnIndex);\n    // Build emotion and intent summary for the prompt header\n    const emotions = [\n        ...new Set(ordered.map((c)=>c.emotion))\n    ].join(\", \");\n    const intents = [\n        ...new Set(ordered.map((c)=>c.intent))\n    ].join(\", \");\n    const hasResolution = ordered.some((c)=>c.isResolutionPresent);\n    const hasEscalation = ordered.some((c)=>c.isEscalation);\n    // Build the context block with rich metadata per chunk\n    const contextBlock = ordered.map((c, i)=>{\n        const speakers = c.speakers.join(\" & \");\n        return `\n--- Segment ${i + 1} [Intent: ${c.intent} | Emotion: ${c.emotion} | Speakers: ${speakers}] ---\nSummary: ${c.topicSummary}\n${c.text}\n${c.isResolutionPresent ? \"✓ Resolution was offered in this segment.\" : \"\"}\n${c.isEscalation ? \"⚠ Escalation detected in this segment.\" : \"\"}\n`.trim();\n    }).join(\"\\n\\n\");\n    return `\nYou are Chatlytics, a conversational intelligence AI specialized in analyzing customer-agent chat transcripts.\n\nYour job: Answer the user's question using ONLY the conversation segments provided below.\nNever invent details. If something isn't in the context, say so clearly.\n\nCONVERSATION INTELLIGENCE SIGNALS:\n- Emotions detected across segments: ${emotions}\n- Conversation intents detected: ${intents}\n- Resolution present: ${hasResolution ? \"Yes\" : \"No\"}\n- Escalation detected: ${hasEscalation ? \"Yes\" : \"No\"}\n\nRETRIEVED CONVERSATION SEGMENTS:\n${contextBlock}\n\nUSER QUESTION: ${question}\n\nInstructions for your answer:\n1. Ground every claim in the segments above\n2. Mention speaker names when relevant (e.g. \"The customer expressed...\")\n3. Note emotional signals if they're relevant to the question\n4. If a resolution or escalation was detected, address it\n5. Be concise but complete — no filler sentences\n6. Start directly with the answer. Never begin with \"Based on the provided conversation segments\" or a similar preface\n`.trim();\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJvbXB0QnVpbGRlci50cyIsIm1hcHBpbmdzIjoiOzs7O0FBRU8sU0FBU0Esb0JBQ2RDLFFBQWdCLEVBQ2hCQyxNQUF3QjtJQUV4QixpRUFBaUU7SUFDakUsTUFBTUMsVUFBVTtXQUFJRDtLQUFPLENBQUNFLElBQUksQ0FBQyxDQUFDQyxHQUFHQyxJQUFNRCxFQUFFRSxTQUFTLEdBQUdELEVBQUVDLFNBQVM7SUFFcEUseURBQXlEO0lBQ3pELE1BQU1DLFdBQVc7V0FBSSxJQUFJQyxJQUFJTixRQUFRTyxHQUFHLENBQUMsQ0FBQ0MsSUFBTUEsRUFBRUMsT0FBTztLQUFHLENBQUNDLElBQUksQ0FBQztJQUNsRSxNQUFNQyxVQUFVO1dBQUksSUFBSUwsSUFBSU4sUUFBUU8sR0FBRyxDQUFDLENBQUNDLElBQU1BLEVBQUVJLE1BQU07S0FBRyxDQUFDRixJQUFJLENBQUM7SUFDaEUsTUFBTUcsZ0JBQWdCYixRQUFRYyxJQUFJLENBQUMsQ0FBQ04sSUFBTUEsRUFBRU8sbUJBQW1CO0lBQy9ELE1BQU1DLGdCQUFnQmhCLFFBQVFjLElBQUksQ0FBQyxDQUFDTixJQUFNQSxFQUFFUyxZQUFZO0lBRXhELHVEQUF1RDtJQUN2RCxNQUFNQyxlQUFlbEIsUUFDbEJPLEdBQUcsQ0FBQyxDQUFDQyxHQUFHVztRQUNQLE1BQU1DLFdBQVdaLEVBQUVZLFFBQVEsQ0FBQ1YsSUFBSSxDQUFDO1FBQ2pDLE9BQU8sQ0FBQztZQUNGLEVBQUVTLElBQUksRUFBRSxVQUFVLEVBQUVYLEVBQUVJLE1BQU0sQ0FBQyxZQUFZLEVBQUVKLEVBQUVDLE9BQU8sQ0FBQyxhQUFhLEVBQUVXLFNBQVM7U0FDaEYsRUFBRVosRUFBRWEsWUFBWSxDQUFDO0FBQzFCLEVBQUViLEVBQUVjLElBQUksQ0FBQztBQUNULEVBQUVkLEVBQUVPLG1CQUFtQixHQUFHLDhDQUE4QyxHQUFHO0FBQzNFLEVBQUVQLEVBQUVTLFlBQVksR0FBRywyQ0FBMkMsR0FBRztBQUNqRSxDQUFDLENBQUNNLElBQUk7SUFDRixHQUNDYixJQUFJLENBQUM7SUFFUixPQUFPLENBQUM7Ozs7Ozs7cUNBTzJCLEVBQUVMLFNBQVM7aUNBQ2YsRUFBRU0sUUFBUTtzQkFDckIsRUFBRUUsZ0JBQWdCLFFBQVEsS0FBSzt1QkFDOUIsRUFBRUcsZ0JBQWdCLFFBQVEsS0FBSzs7O0FBR3RELEVBQUVFLGFBQWE7O2VBRUEsRUFBRXBCLFNBQVM7Ozs7Ozs7OztBQVMxQixDQUFDLENBQUN5QixJQUFJO0FBQ04iLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcSFBcXERlc2t0b3BcXHdlYiBkZXZcXENoYXRseXRpY3NcXGxpYlxccHJvbXB0QnVpbGRlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXRyaWV2ZWRDaHVuayB9IGZyb20gXCJAL3R5cGVzL3JhZ1wiXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRBbmFseXNpc1Byb21wdChcclxuICBxdWVzdGlvbjogc3RyaW5nLFxyXG4gIGNodW5rczogUmV0cmlldmVkQ2h1bmtbXVxyXG4pOiBzdHJpbmcge1xyXG4gIC8vIFNvcnQgY2h1bmtzIGJ5IHRoZWlyIHBvc2l0aW9uIGluIGNvbnZlcnNhdGlvbiBmb3IgbmF0dXJhbCBmbG93XHJcbiAgY29uc3Qgb3JkZXJlZCA9IFsuLi5jaHVua3NdLnNvcnQoKGEsIGIpID0+IGEudHVybkluZGV4IC0gYi50dXJuSW5kZXgpXHJcblxyXG4gIC8vIEJ1aWxkIGVtb3Rpb24gYW5kIGludGVudCBzdW1tYXJ5IGZvciB0aGUgcHJvbXB0IGhlYWRlclxyXG4gIGNvbnN0IGVtb3Rpb25zID0gWy4uLm5ldyBTZXQob3JkZXJlZC5tYXAoKGMpID0+IGMuZW1vdGlvbikpXS5qb2luKFwiLCBcIilcclxuICBjb25zdCBpbnRlbnRzID0gWy4uLm5ldyBTZXQob3JkZXJlZC5tYXAoKGMpID0+IGMuaW50ZW50KSldLmpvaW4oXCIsIFwiKVxyXG4gIGNvbnN0IGhhc1Jlc29sdXRpb24gPSBvcmRlcmVkLnNvbWUoKGMpID0+IGMuaXNSZXNvbHV0aW9uUHJlc2VudClcclxuICBjb25zdCBoYXNFc2NhbGF0aW9uID0gb3JkZXJlZC5zb21lKChjKSA9PiBjLmlzRXNjYWxhdGlvbilcclxuXHJcbiAgLy8gQnVpbGQgdGhlIGNvbnRleHQgYmxvY2sgd2l0aCByaWNoIG1ldGFkYXRhIHBlciBjaHVua1xyXG4gIGNvbnN0IGNvbnRleHRCbG9jayA9IG9yZGVyZWRcclxuICAgIC5tYXAoKGMsIGkpID0+IHtcclxuICAgICAgY29uc3Qgc3BlYWtlcnMgPSBjLnNwZWFrZXJzLmpvaW4oXCIgJiBcIilcclxuICAgICAgcmV0dXJuIGBcclxuLS0tIFNlZ21lbnQgJHtpICsgMX0gW0ludGVudDogJHtjLmludGVudH0gfCBFbW90aW9uOiAke2MuZW1vdGlvbn0gfCBTcGVha2VyczogJHtzcGVha2Vyc31dIC0tLVxyXG5TdW1tYXJ5OiAke2MudG9waWNTdW1tYXJ5fVxyXG4ke2MudGV4dH1cclxuJHtjLmlzUmVzb2x1dGlvblByZXNlbnQgPyBcIuKckyBSZXNvbHV0aW9uIHdhcyBvZmZlcmVkIGluIHRoaXMgc2VnbWVudC5cIiA6IFwiXCJ9XHJcbiR7Yy5pc0VzY2FsYXRpb24gPyBcIuKaoCBFc2NhbGF0aW9uIGRldGVjdGVkIGluIHRoaXMgc2VnbWVudC5cIiA6IFwiXCJ9XHJcbmAudHJpbSgpXHJcbiAgICB9KVxyXG4gICAgLmpvaW4oXCJcXG5cXG5cIilcclxuXHJcbiAgcmV0dXJuIGBcclxuWW91IGFyZSBDaGF0bHl0aWNzLCBhIGNvbnZlcnNhdGlvbmFsIGludGVsbGlnZW5jZSBBSSBzcGVjaWFsaXplZCBpbiBhbmFseXppbmcgY3VzdG9tZXItYWdlbnQgY2hhdCB0cmFuc2NyaXB0cy5cclxuXHJcbllvdXIgam9iOiBBbnN3ZXIgdGhlIHVzZXIncyBxdWVzdGlvbiB1c2luZyBPTkxZIHRoZSBjb252ZXJzYXRpb24gc2VnbWVudHMgcHJvdmlkZWQgYmVsb3cuXHJcbk5ldmVyIGludmVudCBkZXRhaWxzLiBJZiBzb21ldGhpbmcgaXNuJ3QgaW4gdGhlIGNvbnRleHQsIHNheSBzbyBjbGVhcmx5LlxyXG5cclxuQ09OVkVSU0FUSU9OIElOVEVMTElHRU5DRSBTSUdOQUxTOlxyXG4tIEVtb3Rpb25zIGRldGVjdGVkIGFjcm9zcyBzZWdtZW50czogJHtlbW90aW9uc31cclxuLSBDb252ZXJzYXRpb24gaW50ZW50cyBkZXRlY3RlZDogJHtpbnRlbnRzfVxyXG4tIFJlc29sdXRpb24gcHJlc2VudDogJHtoYXNSZXNvbHV0aW9uID8gXCJZZXNcIiA6IFwiTm9cIn1cclxuLSBFc2NhbGF0aW9uIGRldGVjdGVkOiAke2hhc0VzY2FsYXRpb24gPyBcIlllc1wiIDogXCJOb1wifVxyXG5cclxuUkVUUklFVkVEIENPTlZFUlNBVElPTiBTRUdNRU5UUzpcclxuJHtjb250ZXh0QmxvY2t9XHJcblxyXG5VU0VSIFFVRVNUSU9OOiAke3F1ZXN0aW9ufVxyXG5cclxuSW5zdHJ1Y3Rpb25zIGZvciB5b3VyIGFuc3dlcjpcclxuMS4gR3JvdW5kIGV2ZXJ5IGNsYWltIGluIHRoZSBzZWdtZW50cyBhYm92ZVxyXG4yLiBNZW50aW9uIHNwZWFrZXIgbmFtZXMgd2hlbiByZWxldmFudCAoZS5nLiBcIlRoZSBjdXN0b21lciBleHByZXNzZWQuLi5cIilcclxuMy4gTm90ZSBlbW90aW9uYWwgc2lnbmFscyBpZiB0aGV5J3JlIHJlbGV2YW50IHRvIHRoZSBxdWVzdGlvblxyXG40LiBJZiBhIHJlc29sdXRpb24gb3IgZXNjYWxhdGlvbiB3YXMgZGV0ZWN0ZWQsIGFkZHJlc3MgaXRcclxuNS4gQmUgY29uY2lzZSBidXQgY29tcGxldGUg4oCUIG5vIGZpbGxlciBzZW50ZW5jZXNcclxuNi4gU3RhcnQgZGlyZWN0bHkgd2l0aCB0aGUgYW5zd2VyLiBOZXZlciBiZWdpbiB3aXRoIFwiQmFzZWQgb24gdGhlIHByb3ZpZGVkIGNvbnZlcnNhdGlvbiBzZWdtZW50c1wiIG9yIGEgc2ltaWxhciBwcmVmYWNlXHJcbmAudHJpbSgpXHJcbn1cclxuIl0sIm5hbWVzIjpbImJ1aWxkQW5hbHlzaXNQcm9tcHQiLCJxdWVzdGlvbiIsImNodW5rcyIsIm9yZGVyZWQiLCJzb3J0IiwiYSIsImIiLCJ0dXJuSW5kZXgiLCJlbW90aW9ucyIsIlNldCIsIm1hcCIsImMiLCJlbW90aW9uIiwiam9pbiIsImludGVudHMiLCJpbnRlbnQiLCJoYXNSZXNvbHV0aW9uIiwic29tZSIsImlzUmVzb2x1dGlvblByZXNlbnQiLCJoYXNFc2NhbGF0aW9uIiwiaXNFc2NhbGF0aW9uIiwiY29udGV4dEJsb2NrIiwiaSIsInNwZWFrZXJzIiwidG9waWNTdW1tYXJ5IiwidGV4dCIsInRyaW0iXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/promptBuilder.ts\n");

/***/ }),

/***/ "(rsc)/./lib/retriever.ts":
/*!**************************!*\
  !*** ./lib/retriever.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   retrieveAndRank: () => (/* binding */ retrieveAndRank)\n/* harmony export */ });\n/* harmony import */ var _embedder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./embedder */ \"(rsc)/./lib/embedder.ts\");\n/* harmony import */ var _pinecone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pinecone */ \"(rsc)/./lib/pinecone.ts\");\n/* harmony import */ var _gemini__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gemini */ \"(rsc)/./lib/gemini.ts\");\n\n\n\n// ── 1. Detect what kind of question was asked ──────────────────────────────\n// Used to BOOST chunks matching the question's intent\nasync function detectQueryIntent(question) {\n    const prompt = `\nClassify this question into one of these categories:\ncomplaint | query | resolution | escalation | confirmation | chitchat | feedback | unknown\n\nQuestion: \"${question}\"\nRespond with ONLY the category word, nothing else.\n`.trim();\n    try {\n        const raw = (await (0,_gemini__WEBPACK_IMPORTED_MODULE_2__.generateText)(prompt)).trim().toLowerCase();\n        const valid = [\n            \"complaint\",\n            \"query\",\n            \"resolution\",\n            \"escalation\",\n            \"confirmation\",\n            \"chitchat\",\n            \"feedback\",\n            \"unknown\"\n        ];\n        return valid.includes(raw) ? raw : \"unknown\";\n    } catch  {\n        return \"unknown\";\n    }\n}\n// ── 2. Re-rank retrieved chunks by relevance to question ───────────────────\n// Cross-encoder re-ranking: ask Gemini to score each chunk 0–10\n// Much more accurate than cosine similarity alone\nasync function rerankChunks(question, chunks) {\n    if (chunks.length === 0) return chunks;\n    const chunkList = chunks.map((c, i)=>`[${i}] ${c.topicSummary}\\nText: ${c.text.slice(0, 300)}`).join(\"\\n\\n\");\n    const prompt = `\nYou are a retrieval relevance scorer.\nGiven a question and conversation excerpts, score each excerpt's relevance to the question from 0 to 10.\n\nQuestion: \"${question}\"\n\nExcerpts:\n${chunkList}\n\nRespond ONLY with a JSON array of numbers (scores), one per excerpt, in order.\nExample: [8, 3, 9, 1, 6]\n`.trim();\n    try {\n        const raw = (await (0,_gemini__WEBPACK_IMPORTED_MODULE_2__.generateText)(prompt)).replace(/```json|```/g, \"\").trim();\n        const scores = JSON.parse(raw);\n        return chunks.map((chunk, i)=>({\n                ...chunk,\n                rerankScore: scores[i] ?? 0,\n                // Final score: 60% re-rank + 40% semantic similarity\n                finalScore: (scores[i] ?? 0) * 0.6 + chunk.semanticScore * 10 * 0.4\n            }));\n    } catch  {\n        // If re-ranking fails, fall back to semantic score only\n        return chunks.map((c)=>({\n                ...c,\n                rerankScore: 0,\n                finalScore: c.semanticScore * 10\n            }));\n    }\n}\n// ── 3. Main retrieval function ─────────────────────────────────────────────\nasync function retrieveAndRank(question, transcriptId, userId, topK = 5) {\n    // Step A: Embed the question\n    const queryVector = await (0,_embedder__WEBPACK_IMPORTED_MODULE_0__.embedText)(question);\n    // Step B: Detect question intent for metadata boosting\n    const queryIntent = await detectQueryIntent(question);\n    // Step C: Query Pinecone — fetch more than topK so re-ranker has room\n    const index = (0,_pinecone__WEBPACK_IMPORTED_MODULE_1__.getPineconeIndex)();\n    const results = await index.query({\n        vector: queryVector,\n        topK: topK * 3,\n        includeMetadata: true,\n        filter: {\n            transcriptId: {\n                $eq: transcriptId\n            },\n            userId: {\n                $eq: userId\n            }\n        }\n    });\n    let chunks = (results.matches || []).map((match)=>({\n            text: match.metadata?.text || \"\",\n            contextualText: match.metadata?.contextualText || \"\",\n            speakers: match.metadata?.speakers || [],\n            intent: match.metadata?.intent || \"unknown\",\n            emotion: match.metadata?.emotion || \"neutral\",\n            topicSummary: match.metadata?.topicSummary || \"\",\n            turnIndex: match.metadata?.turnIndex || 0,\n            isResolutionPresent: Boolean(match.metadata?.isResolutionPresent),\n            isEscalation: Boolean(match.metadata?.isEscalation),\n            semanticScore: match.score || 0\n        }));\n    if (chunks.length === 0) return [];\n    // Step E: INTENT BOOST\n    // Chunks matching the question's intent get a score bump\n    // e.g. \"how was the complaint resolved?\" → boost resolution chunks\n    if (queryIntent !== \"unknown\") {\n        chunks = chunks.map((c)=>({\n                ...c,\n                semanticScore: c.intent === queryIntent ? c.semanticScore * 1.3 // 30% boost for intent match\n                 : c.semanticScore\n            }));\n    }\n    // Step F: Re-rank using Gemini cross-encoder\n    const reranked = await rerankChunks(question, chunks);\n    // Step G: Sort by final score, return top K\n    return reranked.sort((a, b)=>(b.finalScore ?? 0) - (a.finalScore ?? 0)).slice(0, topK);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFlBQXlCLEVBQUU7WUFDdERDLFFBQVEsTUFBT0gsUUFBUSxFQUFFRyxVQUFpQztZQUMxREMsU0FBUyxNQUFPSixRQUFRLEVBQUVJLFdBQTRCO1lBQ3REL0IsY0FBYyxNQUFPMkIsUUFBUSxFQUFFM0IsZ0JBQTJCO1lBQzFEZ0MsV0FBVyxNQUFPTCxRQUFRLEVBQUVLLGFBQXdCO1lBQ3BEQyxxQkFBcUJDLFFBQVFSLE1BQU1DLFFBQVEsRUFBRU07WUFDN0NFLGNBQWNELFFBQVFSLE1BQU1DLFFBQVEsRUFBRVE7WUFDdEN4QixlQUFlZSxNQUFNVSxLQUFLLElBQUk7UUFDaEM7SUFFQSxJQUFJMUMsT0FBT0MsTUFBTSxLQUFLLEdBQUcsT0FBTyxFQUFFO0lBRWxDLHVCQUF1QjtJQUN2Qix5REFBeUQ7SUFDekQsbUVBQW1FO0lBQ25FLElBQUlzQixnQkFBZ0IsV0FBVztRQUM3QnZCLFNBQVNBLE9BQU9HLEdBQUcsQ0FBQyxDQUFDQyxJQUFPO2dCQUMxQixHQUFHQSxDQUFDO2dCQUNKYSxlQUFlYixFQUFFZ0MsTUFBTSxLQUFLYixjQUN4Qm5CLEVBQUVhLGFBQWEsR0FBRyxJQUFLLDZCQUE2QjttQkFDcERiLEVBQUVhLGFBQWE7WUFDckI7SUFDRjtJQUVBLDZDQUE2QztJQUM3QyxNQUFNMEIsV0FBVyxNQUFNNUMsYUFBYVAsVUFBVVE7SUFFOUMsNENBQTRDO0lBQzVDLE9BQU8yQyxTQUNKQyxJQUFJLENBQUMsQ0FBQ0MsR0FBR0MsSUFBTSxDQUFDQSxFQUFFOUIsVUFBVSxJQUFJLEtBQU02QixDQUFBQSxFQUFFN0IsVUFBVSxJQUFJLElBQ3REUixLQUFLLENBQUMsR0FBR2E7QUFDZCIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxIUFxcRGVza3RvcFxcd2ViIGRldlxcQ2hhdGx5dGljc1xcbGliXFxyZXRyaWV2ZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZW1iZWRUZXh0IH0gZnJvbSBcIi4vZW1iZWRkZXJcIlxyXG5pbXBvcnQgeyBnZXRQaW5lY29uZUluZGV4IH0gZnJvbSBcIi4vcGluZWNvbmVcIlxyXG5pbXBvcnQgeyBSZXRyaWV2ZWRDaHVuaywgQ29udmVyc2F0aW9uSW50ZW50LCBFbW90aW9uTGFiZWwgfSBmcm9tIFwiQC90eXBlcy9yYWdcIlxyXG5pbXBvcnQgeyBnZW5lcmF0ZVRleHQgfSBmcm9tIFwiLi9nZW1pbmlcIlxyXG5cclxuLy8g4pSA4pSAIDEuIERldGVjdCB3aGF0IGtpbmQgb2YgcXVlc3Rpb24gd2FzIGFza2VkIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxyXG4vLyBVc2VkIHRvIEJPT1NUIGNodW5rcyBtYXRjaGluZyB0aGUgcXVlc3Rpb24ncyBpbnRlbnRcclxuYXN5bmMgZnVuY3Rpb24gZGV0ZWN0UXVlcnlJbnRlbnQoXHJcbiAgcXVlc3Rpb246IHN0cmluZ1xyXG4pOiBQcm9taXNlPENvbnZlcnNhdGlvbkludGVudD4ge1xyXG4gIGNvbnN0IHByb21wdCA9IGBcclxuQ2xhc3NpZnkgdGhpcyBxdWVzdGlvbiBpbnRvIG9uZSBvZiB0aGVzZSBjYXRlZ29yaWVzOlxyXG5jb21wbGFpbnQgfCBxdWVyeSB8IHJlc29sdXRpb24gfCBlc2NhbGF0aW9uIHwgY29uZmlybWF0aW9uIHwgY2hpdGNoYXQgfCBmZWVkYmFjayB8IHVua25vd25cclxuXHJcblF1ZXN0aW9uOiBcIiR7cXVlc3Rpb259XCJcclxuUmVzcG9uZCB3aXRoIE9OTFkgdGhlIGNhdGVnb3J5IHdvcmQsIG5vdGhpbmcgZWxzZS5cclxuYC50cmltKClcclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJhdyA9IChhd2FpdCBnZW5lcmF0ZVRleHQocHJvbXB0KSkudHJpbSgpLnRvTG93ZXJDYXNlKCkgYXMgQ29udmVyc2F0aW9uSW50ZW50XHJcbiAgICBjb25zdCB2YWxpZDogQ29udmVyc2F0aW9uSW50ZW50W10gPSBbXHJcbiAgICAgIFwiY29tcGxhaW50XCIsIFwicXVlcnlcIiwgXCJyZXNvbHV0aW9uXCIsIFwiZXNjYWxhdGlvblwiLFxyXG4gICAgICBcImNvbmZpcm1hdGlvblwiLCBcImNoaXRjaGF0XCIsIFwiZmVlZGJhY2tcIiwgXCJ1bmtub3duXCJcclxuICAgIF1cclxuICAgIHJldHVybiB2YWxpZC5pbmNsdWRlcyhyYXcpID8gcmF3IDogXCJ1bmtub3duXCJcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiBcInVua25vd25cIlxyXG4gIH1cclxufVxyXG5cclxuLy8g4pSA4pSAIDIuIFJlLXJhbmsgcmV0cmlldmVkIGNodW5rcyBieSByZWxldmFuY2UgdG8gcXVlc3Rpb24g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXHJcbi8vIENyb3NzLWVuY29kZXIgcmUtcmFua2luZzogYXNrIEdlbWluaSB0byBzY29yZSBlYWNoIGNodW5rIDDigJMxMFxyXG4vLyBNdWNoIG1vcmUgYWNjdXJhdGUgdGhhbiBjb3NpbmUgc2ltaWxhcml0eSBhbG9uZVxyXG5hc3luYyBmdW5jdGlvbiByZXJhbmtDaHVua3MoXHJcbiAgcXVlc3Rpb246IHN0cmluZyxcclxuICBjaHVua3M6IFJldHJpZXZlZENodW5rW11cclxuKTogUHJvbWlzZTxSZXRyaWV2ZWRDaHVua1tdPiB7XHJcbiAgaWYgKGNodW5rcy5sZW5ndGggPT09IDApIHJldHVybiBjaHVua3NcclxuXHJcbiAgY29uc3QgY2h1bmtMaXN0ID0gY2h1bmtzXHJcbiAgICAubWFwKChjLCBpKSA9PiBgWyR7aX1dICR7Yy50b3BpY1N1bW1hcnl9XFxuVGV4dDogJHtjLnRleHQuc2xpY2UoMCwgMzAwKX1gKVxyXG4gICAgLmpvaW4oXCJcXG5cXG5cIilcclxuXHJcbiAgY29uc3QgcHJvbXB0ID0gYFxyXG5Zb3UgYXJlIGEgcmV0cmlldmFsIHJlbGV2YW5jZSBzY29yZXIuXHJcbkdpdmVuIGEgcXVlc3Rpb24gYW5kIGNvbnZlcnNhdGlvbiBleGNlcnB0cywgc2NvcmUgZWFjaCBleGNlcnB0J3MgcmVsZXZhbmNlIHRvIHRoZSBxdWVzdGlvbiBmcm9tIDAgdG8gMTAuXHJcblxyXG5RdWVzdGlvbjogXCIke3F1ZXN0aW9ufVwiXHJcblxyXG5FeGNlcnB0czpcclxuJHtjaHVua0xpc3R9XHJcblxyXG5SZXNwb25kIE9OTFkgd2l0aCBhIEpTT04gYXJyYXkgb2YgbnVtYmVycyAoc2NvcmVzKSwgb25lIHBlciBleGNlcnB0LCBpbiBvcmRlci5cclxuRXhhbXBsZTogWzgsIDMsIDksIDEsIDZdXHJcbmAudHJpbSgpXHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByYXcgPSAoYXdhaXQgZ2VuZXJhdGVUZXh0KHByb21wdCkpLnJlcGxhY2UoL2BgYGpzb258YGBgL2csIFwiXCIpLnRyaW0oKVxyXG4gICAgY29uc3Qgc2NvcmVzOiBudW1iZXJbXSA9IEpTT04ucGFyc2UocmF3KVxyXG5cclxuICAgIHJldHVybiBjaHVua3MubWFwKChjaHVuaywgaSkgPT4gKHtcclxuICAgICAgLi4uY2h1bmssXHJcbiAgICAgIHJlcmFua1Njb3JlOiBzY29yZXNbaV0gPz8gMCxcclxuICAgICAgLy8gRmluYWwgc2NvcmU6IDYwJSByZS1yYW5rICsgNDAlIHNlbWFudGljIHNpbWlsYXJpdHlcclxuICAgICAgZmluYWxTY29yZTogKHNjb3Jlc1tpXSA/PyAwKSAqIDAuNiArIGNodW5rLnNlbWFudGljU2NvcmUgKiAxMCAqIDAuNCxcclxuICAgIH0pKVxyXG4gIH0gY2F0Y2gge1xyXG4gICAgLy8gSWYgcmUtcmFua2luZyBmYWlscywgZmFsbCBiYWNrIHRvIHNlbWFudGljIHNjb3JlIG9ubHlcclxuICAgIHJldHVybiBjaHVua3MubWFwKChjKSA9PiAoe1xyXG4gICAgICAuLi5jLFxyXG4gICAgICByZXJhbmtTY29yZTogMCxcclxuICAgICAgZmluYWxTY29yZTogYy5zZW1hbnRpY1Njb3JlICogMTAsXHJcbiAgICB9KSlcclxuICB9XHJcbn1cclxuXHJcbi8vIOKUgOKUgCAzLiBNYWluIHJldHJpZXZhbCBmdW5jdGlvbiDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJldHJpZXZlQW5kUmFuayhcclxuICBxdWVzdGlvbjogc3RyaW5nLFxyXG4gIHRyYW5zY3JpcHRJZDogc3RyaW5nLFxyXG4gIHVzZXJJZDogc3RyaW5nLFxyXG4gIHRvcEsgPSA1XHJcbik6IFByb21pc2U8UmV0cmlldmVkQ2h1bmtbXT4ge1xyXG4gIC8vIFN0ZXAgQTogRW1iZWQgdGhlIHF1ZXN0aW9uXHJcbiAgY29uc3QgcXVlcnlWZWN0b3IgPSBhd2FpdCBlbWJlZFRleHQocXVlc3Rpb24pXHJcblxyXG4gIC8vIFN0ZXAgQjogRGV0ZWN0IHF1ZXN0aW9uIGludGVudCBmb3IgbWV0YWRhdGEgYm9vc3RpbmdcclxuICBjb25zdCBxdWVyeUludGVudCA9IGF3YWl0IGRldGVjdFF1ZXJ5SW50ZW50KHF1ZXN0aW9uKVxyXG5cclxuICAvLyBTdGVwIEM6IFF1ZXJ5IFBpbmVjb25lIOKAlCBmZXRjaCBtb3JlIHRoYW4gdG9wSyBzbyByZS1yYW5rZXIgaGFzIHJvb21cclxuICBjb25zdCBpbmRleCA9IGdldFBpbmVjb25lSW5kZXgoKVxyXG4gIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBpbmRleC5xdWVyeSh7XHJcbiAgICB2ZWN0b3I6IHF1ZXJ5VmVjdG9yLFxyXG4gICAgdG9wSzogdG9wSyAqIDMsXHJcbiAgICBpbmNsdWRlTWV0YWRhdGE6IHRydWUsXHJcbiAgICBmaWx0ZXI6IHtcclxuICAgICAgdHJhbnNjcmlwdElkOiB7ICRlcTogdHJhbnNjcmlwdElkIH0sXHJcbiAgICAgIHVzZXJJZDogeyAkZXE6IHVzZXJJZCB9LFxyXG4gICAgfSxcclxuICB9KVxyXG5cclxuICBsZXQgY2h1bmtzOiBSZXRyaWV2ZWRDaHVua1tdID0gKHJlc3VsdHMubWF0Y2hlcyB8fCBbXSkubWFwKChtYXRjaCkgPT4gKHtcclxuICAgIHRleHQ6IChtYXRjaC5tZXRhZGF0YT8udGV4dCBhcyBzdHJpbmcpIHx8IFwiXCIsXHJcbiAgICBjb250ZXh0dWFsVGV4dDogKG1hdGNoLm1ldGFkYXRhPy5jb250ZXh0dWFsVGV4dCBhcyBzdHJpbmcpIHx8IFwiXCIsXHJcbiAgICBzcGVha2VyczogKG1hdGNoLm1ldGFkYXRhPy5zcGVha2VycyBhcyBzdHJpbmdbXSkgfHwgW10sXHJcbiAgICBpbnRlbnQ6IChtYXRjaC5tZXRhZGF0YT8uaW50ZW50IGFzIENvbnZlcnNhdGlvbkludGVudCkgfHwgXCJ1bmtub3duXCIsXHJcbiAgICBlbW90aW9uOiAobWF0Y2gubWV0YWRhdGE/LmVtb3Rpb24gYXMgRW1vdGlvbkxhYmVsKSB8fCBcIm5ldXRyYWxcIixcclxuICAgIHRvcGljU3VtbWFyeTogKG1hdGNoLm1ldGFkYXRhPy50b3BpY1N1bW1hcnkgYXMgc3RyaW5nKSB8fCBcIlwiLFxyXG4gICAgdHVybkluZGV4OiAobWF0Y2gubWV0YWRhdGE/LnR1cm5JbmRleCBhcyBudW1iZXIpIHx8IDAsXHJcbiAgICBpc1Jlc29sdXRpb25QcmVzZW50OiBCb29sZWFuKG1hdGNoLm1ldGFkYXRhPy5pc1Jlc29sdXRpb25QcmVzZW50KSxcclxuICAgIGlzRXNjYWxhdGlvbjogQm9vbGVhbihtYXRjaC5tZXRhZGF0YT8uaXNFc2NhbGF0aW9uKSxcclxuICAgIHNlbWFudGljU2NvcmU6IG1hdGNoLnNjb3JlIHx8IDAsXHJcbiAgfSkpXHJcblxyXG4gIGlmIChjaHVua3MubGVuZ3RoID09PSAwKSByZXR1cm4gW11cclxuXHJcbiAgLy8gU3RlcCBFOiBJTlRFTlQgQk9PU1RcclxuICAvLyBDaHVua3MgbWF0Y2hpbmcgdGhlIHF1ZXN0aW9uJ3MgaW50ZW50IGdldCBhIHNjb3JlIGJ1bXBcclxuICAvLyBlLmcuIFwiaG93IHdhcyB0aGUgY29tcGxhaW50IHJlc29sdmVkP1wiIOKGkiBib29zdCByZXNvbHV0aW9uIGNodW5rc1xyXG4gIGlmIChxdWVyeUludGVudCAhPT0gXCJ1bmtub3duXCIpIHtcclxuICAgIGNodW5rcyA9IGNodW5rcy5tYXAoKGMpID0+ICh7XHJcbiAgICAgIC4uLmMsXHJcbiAgICAgIHNlbWFudGljU2NvcmU6IGMuaW50ZW50ID09PSBxdWVyeUludGVudFxyXG4gICAgICAgID8gYy5zZW1hbnRpY1Njb3JlICogMS4zICAvLyAzMCUgYm9vc3QgZm9yIGludGVudCBtYXRjaFxyXG4gICAgICAgIDogYy5zZW1hbnRpY1Njb3JlLFxyXG4gICAgfSkpXHJcbiAgfVxyXG5cclxuICAvLyBTdGVwIEY6IFJlLXJhbmsgdXNpbmcgR2VtaW5pIGNyb3NzLWVuY29kZXJcclxuICBjb25zdCByZXJhbmtlZCA9IGF3YWl0IHJlcmFua0NodW5rcyhxdWVzdGlvbiwgY2h1bmtzKVxyXG5cclxuICAvLyBTdGVwIEc6IFNvcnQgYnkgZmluYWwgc2NvcmUsIHJldHVybiB0b3AgS1xyXG4gIHJldHVybiByZXJhbmtlZFxyXG4gICAgLnNvcnQoKGEsIGIpID0+IChiLmZpbmFsU2NvcmUgPz8gMCkgLSAoYS5maW5hbFNjb3JlID8/IDApKVxyXG4gICAgLnNsaWNlKDAsIHRvcEspXHJcbn1cclxuIl0sIm5hbWVzIjpbImVtYmVkVGV4dCIsImdldFBpbmVjb25lSW5kZXgiLCJnZW5lcmF0ZVRleHQiLCJkZXRlY3RRdWVyeUludGVudCIsInF1ZXN0aW9uIiwicHJvbXB0IiwidHJpbSIsInJhdyIsInRvTG93ZXJDYXNlIiwidmFsaWQiLCJpbmNsdWRlcyIsInJlcmFua0NodW5rcyIsImNodW5rcyIsImxlbmd0aCIsImNodW5rTGlzdCIsIm1hcCIsImMiLCJpIiwidG9waWNTdW1tYXJ5IiwidGV4dCIsInNsaWNlIiwiam9pbiIsInJlcGxhY2UiLCJzY29yZXMiLCJKU09OIiwicGFyc2UiLCJjaHVuayIsInJlcmFua1Njb3JlIiwiZmluYWxTY29yZSIsInNlbWFudGljU2NvcmUiLCJyZXRyaWV2ZUFuZFJhbmsiLCJ0cmFuc2NyaXB0SWQiLCJ1c2VySWQiLCJ0b3BLIiwicXVlcnlWZWN0b3IiLCJxdWVyeUludGVudCIsImluZGV4IiwicmVzdWx0cyIsInF1ZXJ5IiwidmVjdG9yIiwiaW5jbHVkZU1ldGFkYXRhIiwiZmlsdGVyIiwiJGVxIiwibWF0Y2hlcyIsIm1hdGNoIiwibWV0YWRhdGEiLCJjb250ZXh0dWFsVGV4dCIsInNwZWFrZXJzIiwiaW50ZW50IiwiZW1vdGlvbiIsInR1cm5JbmRleCIsImlzUmVzb2x1dGlvblByZXNlbnQiLCJCb29sZWFuIiwiaXNFc2NhbGF0aW9uIiwic2NvcmUiLCJyZXJhbmtlZCIsInNvcnQiLCJhIiwiYiJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/retriever.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fanalyze%2Froute&page=%2Fapi%2Fanalyze%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fanalyze%2Froute.ts&appDir=C%3A%5CUsers%5CHP%5CDesktop%5Cweb%20dev%5CChatlytics%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHP%5CDesktop%5Cweb%20dev%5CChatlytics&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fanalyze%2Froute&page=%2Fapi%2Fanalyze%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fanalyze%2Froute.ts&appDir=C%3A%5CUsers%5CHP%5CDesktop%5Cweb%20dev%5CChatlytics%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHP%5CDesktop%5Cweb%20dev%5CChatlytics&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   handler: () => (/* binding */ handler),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/dist/server/request-meta */ \"(rsc)/./node_modules/next/dist/server/request-meta.js\");\n/* harmony import */ var next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/dist/server/lib/trace/tracer */ \"(rsc)/./node_modules/next/dist/server/lib/trace/tracer.js\");\n/* harmony import */ var next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/dist/shared/lib/router/utils/app-paths */ \"next/dist/shared/lib/router/utils/app-paths\");\n/* harmony import */ var next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/dist/server/base-http/node */ \"(rsc)/./node_modules/next/dist/server/base-http/node.js\");\n/* harmony import */ var next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/dist/server/web/spec-extension/adapters/next-request */ \"(rsc)/./node_modules/next/dist/server/web/spec-extension/adapters/next-request.js\");\n/* harmony import */ var next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/dist/server/lib/trace/constants */ \"(rsc)/./node_modules/next/dist/server/lib/trace/constants.js\");\n/* harmony import */ var next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next/dist/server/instrumentation/utils */ \"(rsc)/./node_modules/next/dist/server/instrumentation/utils.js\");\n/* harmony import */ var next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! next/dist/server/send-response */ \"(rsc)/./node_modules/next/dist/server/send-response.js\");\n/* harmony import */ var next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! next/dist/server/web/utils */ \"(rsc)/./node_modules/next/dist/server/web/utils.js\");\n/* harmony import */ var next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var next_dist_server_lib_cache_control__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! next/dist/server/lib/cache-control */ \"(rsc)/./node_modules/next/dist/server/lib/cache-control.js\");\n/* harmony import */ var next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! next/dist/lib/constants */ \"(rsc)/./node_modules/next/dist/lib/constants.js\");\n/* harmony import */ var next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! next/dist/shared/lib/no-fallback-error.external */ \"next/dist/shared/lib/no-fallback-error.external\");\n/* harmony import */ var next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! next/dist/server/response-cache */ \"(rsc)/./node_modules/next/dist/server/response-cache/index.js\");\n/* harmony import */ var next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_15__);\n/* harmony import */ var C_Users_HP_Desktop_web_dev_Chatlytics_app_api_analyze_route_ts__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./app/api/analyze/route.ts */ \"(rsc)/./app/api/analyze/route.ts\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/analyze/route\",\n        pathname: \"/api/analyze\",\n        filename: \"route\",\n        bundlePath: \"app/api/analyze/route\"\n    },\n    distDir: \".next-dev\" || 0,\n    relativeProjectDir:  false || '',\n    resolvedPagePath: \"C:\\\\Users\\\\HP\\\\Desktop\\\\web dev\\\\Chatlytics\\\\app\\\\api\\\\analyze\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_HP_Desktop_web_dev_Chatlytics_app_api_analyze_route_ts__WEBPACK_IMPORTED_MODULE_16__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\nasync function handler(req, res, ctx) {\n    var _nextConfig_experimental;\n    let srcPage = \"/api/analyze/route\";\n    // turbopack doesn't normalize `/index` in the page name\n    // so we need to to process dynamic routes properly\n    // TODO: fix turbopack providing differing value from webpack\n    if (false) {} else if (srcPage === '/index') {\n        // we always normalize /index specifically\n        srcPage = '/';\n    }\n    const multiZoneDraftMode = false;\n    const prepareResult = await routeModule.prepare(req, res, {\n        srcPage,\n        multiZoneDraftMode\n    });\n    if (!prepareResult) {\n        res.statusCode = 400;\n        res.end('Bad Request');\n        ctx.waitUntil == null ? void 0 : ctx.waitUntil.call(ctx, Promise.resolve());\n        return null;\n    }\n    const { buildId, params, nextConfig, isDraftMode, prerenderManifest, routerServerContext, isOnDemandRevalidate, revalidateOnlyGenerated, resolvedPathname } = prepareResult;\n    const normalizedSrcPage = (0,next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_5__.normalizeAppPath)(srcPage);\n    let isIsr = Boolean(prerenderManifest.dynamicRoutes[normalizedSrcPage] || prerenderManifest.routes[resolvedPathname]);\n    if (isIsr && !isDraftMode) {\n        const isPrerendered = Boolean(prerenderManifest.routes[resolvedPathname]);\n        const prerenderInfo = prerenderManifest.dynamicRoutes[normalizedSrcPage];\n        if (prerenderInfo) {\n            if (prerenderInfo.fallback === false && !isPrerendered) {\n                throw new next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_14__.NoFallbackError();\n            }\n        }\n    }\n    let cacheKey = null;\n    if (isIsr && !routeModule.isDev && !isDraftMode) {\n        cacheKey = resolvedPathname;\n        // ensure /index and / is normalized to one key\n        cacheKey = cacheKey === '/index' ? '/' : cacheKey;\n    }\n    const supportsDynamicResponse = // If we're in development, we always support dynamic HTML\n    routeModule.isDev === true || // If this is not SSG or does not have static paths, then it supports\n    // dynamic HTML.\n    !isIsr;\n    // This is a revalidation request if the request is for a static\n    // page and it is not being resumed from a postponed render and\n    // it is not a dynamic RSC request then it is a revalidation\n    // request.\n    const isRevalidate = isIsr && !supportsDynamicResponse;\n    const method = req.method || 'GET';\n    const tracer = (0,next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__.getTracer)();\n    const activeSpan = tracer.getActiveScopeSpan();\n    const context = {\n        params,\n        prerenderManifest,\n        renderOpts: {\n            experimental: {\n                cacheComponents: Boolean(nextConfig.experimental.cacheComponents),\n                authInterrupts: Boolean(nextConfig.experimental.authInterrupts)\n            },\n            supportsDynamicResponse,\n            incrementalCache: (0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'incrementalCache'),\n            cacheLifeProfiles: (_nextConfig_experimental = nextConfig.experimental) == null ? void 0 : _nextConfig_experimental.cacheLife,\n            isRevalidate,\n            waitUntil: ctx.waitUntil,\n            onClose: (cb)=>{\n                res.on('close', cb);\n            },\n            onAfterTaskError: undefined,\n            onInstrumentationRequestError: (error, _request, errorContext)=>routeModule.onRequestError(req, error, errorContext, routerServerContext)\n        },\n        sharedContext: {\n            buildId\n        }\n    };\n    const nodeNextReq = new next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_6__.NodeNextRequest(req);\n    const nodeNextRes = new next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_6__.NodeNextResponse(res);\n    const nextReq = next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_7__.NextRequestAdapter.fromNodeNextRequest(nodeNextReq, (0,next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_7__.signalFromNodeResponse)(res));\n    try {\n        const invokeRouteModule = async (span)=>{\n            return routeModule.handle(nextReq, context).finally(()=>{\n                if (!span) return;\n                span.setAttributes({\n                    'http.status_code': res.statusCode,\n                    'next.rsc': false\n                });\n                const rootSpanAttributes = tracer.getRootSpanAttributes();\n                // We were unable to get attributes, probably OTEL is not enabled\n                if (!rootSpanAttributes) {\n                    return;\n                }\n                if (rootSpanAttributes.get('next.span_type') !== next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_8__.BaseServerSpan.handleRequest) {\n                    console.warn(`Unexpected root span type '${rootSpanAttributes.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`);\n                    return;\n                }\n                const route = rootSpanAttributes.get('next.route');\n                if (route) {\n                    const name = `${method} ${route}`;\n                    span.setAttributes({\n                        'next.route': route,\n                        'http.route': route,\n                        'next.span_name': name\n                    });\n                    span.updateName(name);\n                } else {\n                    span.updateName(`${method} ${req.url}`);\n                }\n            });\n        };\n        const handleResponse = async (currentSpan)=>{\n            var _cacheEntry_value;\n            const responseGenerator = async ({ previousCacheEntry })=>{\n                try {\n                    if (!(0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'minimalMode') && isOnDemandRevalidate && revalidateOnlyGenerated && !previousCacheEntry) {\n                        res.statusCode = 404;\n                        // on-demand revalidate always sets this header\n                        res.setHeader('x-nextjs-cache', 'REVALIDATED');\n                        res.end('This page could not be found');\n                        return null;\n                    }\n                    const response = await invokeRouteModule(currentSpan);\n                    req.fetchMetrics = context.renderOpts.fetchMetrics;\n                    let pendingWaitUntil = context.renderOpts.pendingWaitUntil;\n                    // Attempt using provided waitUntil if available\n                    // if it's not we fallback to sendResponse's handling\n                    if (pendingWaitUntil) {\n                        if (ctx.waitUntil) {\n                            ctx.waitUntil(pendingWaitUntil);\n                            pendingWaitUntil = undefined;\n                        }\n                    }\n                    const cacheTags = context.renderOpts.collectedTags;\n                    // If the request is for a static response, we can cache it so long\n                    // as it's not edge.\n                    if (isIsr) {\n                        const blob = await response.blob();\n                        // Copy the headers from the response.\n                        const headers = (0,next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_11__.toNodeOutgoingHttpHeaders)(response.headers);\n                        if (cacheTags) {\n                            headers[next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13__.NEXT_CACHE_TAGS_HEADER] = cacheTags;\n                        }\n                        if (!headers['content-type'] && blob.type) {\n                            headers['content-type'] = blob.type;\n                        }\n                        const revalidate = typeof context.renderOpts.collectedRevalidate === 'undefined' || context.renderOpts.collectedRevalidate >= next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13__.INFINITE_CACHE ? false : context.renderOpts.collectedRevalidate;\n                        const expire = typeof context.renderOpts.collectedExpire === 'undefined' || context.renderOpts.collectedExpire >= next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13__.INFINITE_CACHE ? undefined : context.renderOpts.collectedExpire;\n                        // Create the cache entry for the response.\n                        const cacheEntry = {\n                            value: {\n                                kind: next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_15__.CachedRouteKind.APP_ROUTE,\n                                status: response.status,\n                                body: Buffer.from(await blob.arrayBuffer()),\n                                headers\n                            },\n                            cacheControl: {\n                                revalidate,\n                                expire\n                            }\n                        };\n                        return cacheEntry;\n                    } else {\n                        // send response without caching if not ISR\n                        await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_10__.sendResponse)(nodeNextReq, nodeNextRes, response, context.renderOpts.pendingWaitUntil);\n                        return null;\n                    }\n                } catch (err) {\n                    // if this is a background revalidate we need to report\n                    // the request error here as it won't be bubbled\n                    if (previousCacheEntry == null ? void 0 : previousCacheEntry.isStale) {\n                        await routeModule.onRequestError(req, err, {\n                            routerKind: 'App Router',\n                            routePath: srcPage,\n                            routeType: 'route',\n                            revalidateReason: (0,next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_9__.getRevalidateReason)({\n                                isRevalidate,\n                                isOnDemandRevalidate\n                            })\n                        }, routerServerContext);\n                    }\n                    throw err;\n                }\n            };\n            const cacheEntry = await routeModule.handleResponse({\n                req,\n                nextConfig,\n                cacheKey,\n                routeKind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n                isFallback: false,\n                prerenderManifest,\n                isRoutePPREnabled: false,\n                isOnDemandRevalidate,\n                revalidateOnlyGenerated,\n                responseGenerator,\n                waitUntil: ctx.waitUntil\n            });\n            // we don't create a cacheEntry for ISR\n            if (!isIsr) {\n                return null;\n            }\n            if ((cacheEntry == null ? void 0 : (_cacheEntry_value = cacheEntry.value) == null ? void 0 : _cacheEntry_value.kind) !== next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_15__.CachedRouteKind.APP_ROUTE) {\n                var _cacheEntry_value1;\n                throw Object.defineProperty(new Error(`Invariant: app-route received invalid cache entry ${cacheEntry == null ? void 0 : (_cacheEntry_value1 = cacheEntry.value) == null ? void 0 : _cacheEntry_value1.kind}`), \"__NEXT_ERROR_CODE\", {\n                    value: \"E701\",\n                    enumerable: false,\n                    configurable: true\n                });\n            }\n            if (!(0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'minimalMode')) {\n                res.setHeader('x-nextjs-cache', isOnDemandRevalidate ? 'REVALIDATED' : cacheEntry.isMiss ? 'MISS' : cacheEntry.isStale ? 'STALE' : 'HIT');\n            }\n            // Draft mode should never be cached\n            if (isDraftMode) {\n                res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');\n            }\n            const headers = (0,next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_11__.fromNodeOutgoingHttpHeaders)(cacheEntry.value.headers);\n            if (!((0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'minimalMode') && isIsr)) {\n                headers.delete(next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13__.NEXT_CACHE_TAGS_HEADER);\n            }\n            // If cache control is already set on the response we don't\n            // override it to allow users to customize it via next.config\n            if (cacheEntry.cacheControl && !res.getHeader('Cache-Control') && !headers.get('Cache-Control')) {\n                headers.set('Cache-Control', (0,next_dist_server_lib_cache_control__WEBPACK_IMPORTED_MODULE_12__.getCacheControlHeader)(cacheEntry.cacheControl));\n            }\n            await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_10__.sendResponse)(nodeNextReq, nodeNextRes, new Response(cacheEntry.value.body, {\n                headers,\n                status: cacheEntry.value.status || 200\n            }));\n            return null;\n        };\n        // TODO: activeSpan code path is for when wrapped by\n        // next-server can be removed when this is no longer used\n        if (activeSpan) {\n            await handleResponse(activeSpan);\n        } else {\n            await tracer.withPropagatedContext(req.headers, ()=>tracer.trace(next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_8__.BaseServerSpan.handleRequest, {\n                    spanName: `${method} ${req.url}`,\n                    kind: next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__.SpanKind.SERVER,\n                    attributes: {\n                        'http.method': method,\n                        'http.target': req.url\n                    }\n                }, handleResponse));\n        }\n    } catch (err) {\n        if (!(err instanceof next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_14__.NoFallbackError)) {\n            await routeModule.onRequestError(req, err, {\n                routerKind: 'App Router',\n                routePath: normalizedSrcPage,\n                routeType: 'route',\n                revalidateReason: (0,next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_9__.getRevalidateReason)({\n                    isRevalidate,\n                    isOnDemandRevalidate\n                })\n            });\n        }\n        // rethrow so that we can handle serving error page\n        // If this is during static generation, throw the error again.\n        if (isIsr) throw err;\n        // Otherwise, send a 500 response.\n        await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_10__.sendResponse)(nodeNextReq, nodeNextRes, new Response(null, {\n            status: 500\n        }));\n        return null;\n    }\n}\n\n//# sourceMappingURL=app-route.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhbmFseXplJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhbmFseXplJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYW5hbHl6ZSUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNIUCU1Q0Rlc2t0b3AlNUN3ZWIlMjBkZXYlNUNDaGF0bHl0aWNzJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNIUCU1Q0Rlc2t0b3AlNUN3ZWIlMjBkZXYlNUNDaGF0bHl0aWNzJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEJmlzR2xvYmFsTm90Rm91bmRFbmFibGVkPSEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDZDtBQUNTO0FBQ087QUFDSztBQUNtQztBQUNqRDtBQUNPO0FBQ2Y7QUFDc0M7QUFDekI7QUFDTTtBQUNDO0FBQ2hCO0FBQ21DO0FBQ3JHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLGFBQWEsV0FBb0MsSUFBSSxDQUFFO0FBQ3ZELHdCQUF3QixNQUF1QztBQUMvRDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7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Q0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLDZFQUE2RSxnRkFBYztBQUMzRixpQ0FBaUMsUUFBUSxFQUFFLFFBQVE7QUFDbkQsMEJBQTBCLHVFQUFRO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsTUFBTTtBQUNOLDZCQUE2Qiw2RkFBZTtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQywyRkFBbUI7QUFDckQ7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsNkVBQVk7QUFDMUI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0IHsgZ2V0UmVxdWVzdE1ldGEgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yZXF1ZXN0LW1ldGFcIjtcbmltcG9ydCB7IGdldFRyYWNlciwgU3BhbktpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvdHJhY2UvdHJhY2VyXCI7XG5pbXBvcnQgeyBub3JtYWxpemVBcHBQYXRoIH0gZnJvbSBcIm5leHQvZGlzdC9zaGFyZWQvbGliL3JvdXRlci91dGlscy9hcHAtcGF0aHNcIjtcbmltcG9ydCB7IE5vZGVOZXh0UmVxdWVzdCwgTm9kZU5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Jhc2UtaHR0cC9ub2RlXCI7XG5pbXBvcnQgeyBOZXh0UmVxdWVzdEFkYXB0ZXIsIHNpZ25hbEZyb21Ob2RlUmVzcG9uc2UgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci93ZWIvc3BlYy1leHRlbnNpb24vYWRhcHRlcnMvbmV4dC1yZXF1ZXN0XCI7XG5pbXBvcnQgeyBCYXNlU2VydmVyU3BhbiB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi90cmFjZS9jb25zdGFudHNcIjtcbmltcG9ydCB7IGdldFJldmFsaWRhdGVSZWFzb24gfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9pbnN0cnVtZW50YXRpb24vdXRpbHNcIjtcbmltcG9ydCB7IHNlbmRSZXNwb25zZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3NlbmQtcmVzcG9uc2VcIjtcbmltcG9ydCB7IGZyb21Ob2RlT3V0Z29pbmdIdHRwSGVhZGVycywgdG9Ob2RlT3V0Z29pbmdIdHRwSGVhZGVycyB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3dlYi91dGlsc1wiO1xuaW1wb3J0IHsgZ2V0Q2FjaGVDb250cm9sSGVhZGVyIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL2NhY2hlLWNvbnRyb2xcIjtcbmltcG9ydCB7IElORklOSVRFX0NBQ0hFLCBORVhUX0NBQ0hFX1RBR1NfSEVBREVSIH0gZnJvbSBcIm5leHQvZGlzdC9saWIvY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBOb0ZhbGxiYWNrRXJyb3IgfSBmcm9tIFwibmV4dC9kaXN0L3NoYXJlZC9saWIvbm8tZmFsbGJhY2stZXJyb3IuZXh0ZXJuYWxcIjtcbmltcG9ydCB7IENhY2hlZFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3Jlc3BvbnNlLWNhY2hlXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcSFBcXFxcRGVza3RvcFxcXFx3ZWIgZGV2XFxcXENoYXRseXRpY3NcXFxcYXBwXFxcXGFwaVxcXFxhbmFseXplXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hbmFseXplL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYW5hbHl6ZVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYW5hbHl6ZS9yb3V0ZVwiXG4gICAgfSxcbiAgICBkaXN0RGlyOiBwcm9jZXNzLmVudi5fX05FWFRfUkVMQVRJVkVfRElTVF9ESVIgfHwgJycsXG4gICAgcmVsYXRpdmVQcm9qZWN0RGlyOiBwcm9jZXNzLmVudi5fX05FWFRfUkVMQVRJVkVfUFJPSkVDVF9ESVIgfHwgJycsXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxIUFxcXFxEZXNrdG9wXFxcXHdlYiBkZXZcXFxcQ2hhdGx5dGljc1xcXFxhcHBcXFxcYXBpXFxcXGFuYWx5emVcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihyZXEsIHJlcywgY3R4KSB7XG4gICAgdmFyIF9uZXh0Q29uZmlnX2V4cGVyaW1lbnRhbDtcbiAgICBsZXQgc3JjUGFnZSA9IFwiL2FwaS9hbmFseXplL3JvdXRlXCI7XG4gICAgLy8gdHVyYm9wYWNrIGRvZXNuJ3Qgbm9ybWFsaXplIGAvaW5kZXhgIGluIHRoZSBwYWdlIG5hbWVcbiAgICAvLyBzbyB3ZSBuZWVkIHRvIHRvIHByb2Nlc3MgZHluYW1pYyByb3V0ZXMgcHJvcGVybHlcbiAgICAvLyBUT0RPOiBmaXggdHVyYm9wYWNrIHByb3ZpZGluZyBkaWZmZXJpbmcgdmFsdWUgZnJvbSB3ZWJwYWNrXG4gICAgaWYgKHByb2Nlc3MuZW52LlRVUkJPUEFDSykge1xuICAgICAgICBzcmNQYWdlID0gc3JjUGFnZS5yZXBsYWNlKC9cXC9pbmRleCQvLCAnJykgfHwgJy8nO1xuICAgIH0gZWxzZSBpZiAoc3JjUGFnZSA9PT0gJy9pbmRleCcpIHtcbiAgICAgICAgLy8gd2UgYWx3YXlzIG5vcm1hbGl6ZSAvaW5kZXggc3BlY2lmaWNhbGx5XG4gICAgICAgIHNyY1BhZ2UgPSAnLyc7XG4gICAgfVxuICAgIGNvbnN0IG11bHRpWm9uZURyYWZ0TW9kZSA9IHByb2Nlc3MuZW52Ll9fTkVYVF9NVUxUSV9aT05FX0RSQUZUX01PREU7XG4gICAgY29uc3QgcHJlcGFyZVJlc3VsdCA9IGF3YWl0IHJvdXRlTW9kdWxlLnByZXBhcmUocmVxLCByZXMsIHtcbiAgICAgICAgc3JjUGFnZSxcbiAgICAgICAgbXVsdGlab25lRHJhZnRNb2RlXG4gICAgfSk7XG4gICAgaWYgKCFwcmVwYXJlUmVzdWx0KSB7XG4gICAgICAgIHJlcy5zdGF0dXNDb2RlID0gNDAwO1xuICAgICAgICByZXMuZW5kKCdCYWQgUmVxdWVzdCcpO1xuICAgICAgICBjdHgud2FpdFVudGlsID09IG51bGwgPyB2b2lkIDAgOiBjdHgud2FpdFVudGlsLmNhbGwoY3R4LCBQcm9taXNlLnJlc29sdmUoKSk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCB7IGJ1aWxkSWQsIHBhcmFtcywgbmV4dENvbmZpZywgaXNEcmFmdE1vZGUsIHByZXJlbmRlck1hbmlmZXN0LCByb3V0ZXJTZXJ2ZXJDb250ZXh0LCBpc09uRGVtYW5kUmV2YWxpZGF0ZSwgcmV2YWxpZGF0ZU9ubHlHZW5lcmF0ZWQsIHJlc29sdmVkUGF0aG5hbWUgfSA9IHByZXBhcmVSZXN1bHQ7XG4gICAgY29uc3Qgbm9ybWFsaXplZFNyY1BhZ2UgPSBub3JtYWxpemVBcHBQYXRoKHNyY1BhZ2UpO1xuICAgIGxldCBpc0lzciA9IEJvb2xlYW4ocHJlcmVuZGVyTWFuaWZlc3QuZHluYW1pY1JvdXRlc1tub3JtYWxpemVkU3JjUGFnZV0gfHwgcHJlcmVuZGVyTWFuaWZlc3Qucm91dGVzW3Jlc29sdmVkUGF0aG5hbWVdKTtcbiAgICBpZiAoaXNJc3IgJiYgIWlzRHJhZnRNb2RlKSB7XG4gICAgICAgIGNvbnN0IGlzUHJlcmVuZGVyZWQgPSBCb29sZWFuKHByZXJlbmRlck1hbmlmZXN0LnJvdXRlc1tyZXNvbHZlZFBhdGhuYW1lXSk7XG4gICAgICAgIGNvbnN0IHByZXJlbmRlckluZm8gPSBwcmVyZW5kZXJNYW5pZmVzdC5keW5hbWljUm91dGVzW25vcm1hbGl6ZWRTcmNQYWdlXTtcbiAgICAgICAgaWYgKHByZXJlbmRlckluZm8pIHtcbiAgICAgICAgICAgIGlmIChwcmVyZW5kZXJJbmZvLmZhbGxiYWNrID09PSBmYWxzZSAmJiAhaXNQcmVyZW5kZXJlZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBOb0ZhbGxiYWNrRXJyb3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgY2FjaGVLZXkgPSBudWxsO1xuICAgIGlmIChpc0lzciAmJiAhcm91dGVNb2R1bGUuaXNEZXYgJiYgIWlzRHJhZnRNb2RlKSB7XG4gICAgICAgIGNhY2hlS2V5ID0gcmVzb2x2ZWRQYXRobmFtZTtcbiAgICAgICAgLy8gZW5zdXJlIC9pbmRleCBhbmQgLyBpcyBub3JtYWxpemVkIHRvIG9uZSBrZXlcbiAgICAgICAgY2FjaGVLZXkgPSBjYWNoZUtleSA9PT0gJy9pbmRleCcgPyAnLycgOiBjYWNoZUtleTtcbiAgICB9XG4gICAgY29uc3Qgc3VwcG9ydHNEeW5hbWljUmVzcG9uc2UgPSAvLyBJZiB3ZSdyZSBpbiBkZXZlbG9wbWVudCwgd2UgYWx3YXlzIHN1cHBvcnQgZHluYW1pYyBIVE1MXG4gICAgcm91dGVNb2R1bGUuaXNEZXYgPT09IHRydWUgfHwgLy8gSWYgdGhpcyBpcyBub3QgU1NHIG9yIGRvZXMgbm90IGhhdmUgc3RhdGljIHBhdGhzLCB0aGVuIGl0IHN1cHBvcnRzXG4gICAgLy8gZHluYW1pYyBIVE1MLlxuICAgICFpc0lzcjtcbiAgICAvLyBUaGlzIGlzIGEgcmV2YWxpZGF0aW9uIHJlcXVlc3QgaWYgdGhlIHJlcXVlc3QgaXMgZm9yIGEgc3RhdGljXG4gICAgLy8gcGFnZSBhbmQgaXQgaXMgbm90IGJlaW5nIHJlc3VtZWQgZnJvbSBhIHBvc3Rwb25lZCByZW5kZXIgYW5kXG4gICAgLy8gaXQgaXMgbm90IGEgZHluYW1pYyBSU0MgcmVxdWVzdCB0aGVuIGl0IGlzIGEgcmV2YWxpZGF0aW9uXG4gICAgLy8gcmVxdWVzdC5cbiAgICBjb25zdCBpc1JldmFsaWRhdGUgPSBpc0lzciAmJiAhc3VwcG9ydHNEeW5hbWljUmVzcG9uc2U7XG4gICAgY29uc3QgbWV0aG9kID0gcmVxLm1ldGhvZCB8fCAnR0VUJztcbiAgICBjb25zdCB0cmFjZXIgPSBnZXRUcmFjZXIoKTtcbiAgICBjb25zdCBhY3RpdmVTcGFuID0gdHJhY2VyLmdldEFjdGl2ZVNjb3BlU3BhbigpO1xuICAgIGNvbnN0IGNvbnRleHQgPSB7XG4gICAgICAgIHBhcmFtcyxcbiAgICAgICAgcHJlcmVuZGVyTWFuaWZlc3QsXG4gICAgICAgIHJlbmRlck9wdHM6IHtcbiAgICAgICAgICAgIGV4cGVyaW1lbnRhbDoge1xuICAgICAgICAgICAgICAgIGNhY2hlQ29tcG9uZW50czogQm9vbGVhbihuZXh0Q29uZmlnLmV4cGVyaW1lbnRhbC5jYWNoZUNvbXBvbmVudHMpLFxuICAgICAgICAgICAgICAgIGF1dGhJbnRlcnJ1cHRzOiBCb29sZWFuKG5leHRDb25maWcuZXhwZXJpbWVudGFsLmF1dGhJbnRlcnJ1cHRzKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1cHBvcnRzRHluYW1pY1Jlc3BvbnNlLFxuICAgICAgICAgICAgaW5jcmVtZW50YWxDYWNoZTogZ2V0UmVxdWVzdE1ldGEocmVxLCAnaW5jcmVtZW50YWxDYWNoZScpLFxuICAgICAgICAgICAgY2FjaGVMaWZlUHJvZmlsZXM6IChfbmV4dENvbmZpZ19leHBlcmltZW50YWwgPSBuZXh0Q29uZmlnLmV4cGVyaW1lbnRhbCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9uZXh0Q29uZmlnX2V4cGVyaW1lbnRhbC5jYWNoZUxpZmUsXG4gICAgICAgICAgICBpc1JldmFsaWRhdGUsXG4gICAgICAgICAgICB3YWl0VW50aWw6IGN0eC53YWl0VW50aWwsXG4gICAgICAgICAgICBvbkNsb3NlOiAoY2IpPT57XG4gICAgICAgICAgICAgICAgcmVzLm9uKCdjbG9zZScsIGNiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkFmdGVyVGFza0Vycm9yOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBvbkluc3RydW1lbnRhdGlvblJlcXVlc3RFcnJvcjogKGVycm9yLCBfcmVxdWVzdCwgZXJyb3JDb250ZXh0KT0+cm91dGVNb2R1bGUub25SZXF1ZXN0RXJyb3IocmVxLCBlcnJvciwgZXJyb3JDb250ZXh0LCByb3V0ZXJTZXJ2ZXJDb250ZXh0KVxuICAgICAgICB9LFxuICAgICAgICBzaGFyZWRDb250ZXh0OiB7XG4gICAgICAgICAgICBidWlsZElkXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IG5vZGVOZXh0UmVxID0gbmV3IE5vZGVOZXh0UmVxdWVzdChyZXEpO1xuICAgIGNvbnN0IG5vZGVOZXh0UmVzID0gbmV3IE5vZGVOZXh0UmVzcG9uc2UocmVzKTtcbiAgICBjb25zdCBuZXh0UmVxID0gTmV4dFJlcXVlc3RBZGFwdGVyLmZyb21Ob2RlTmV4dFJlcXVlc3Qobm9kZU5leHRSZXEsIHNpZ25hbEZyb21Ob2RlUmVzcG9uc2UocmVzKSk7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgaW52b2tlUm91dGVNb2R1bGUgPSBhc3luYyAoc3Bhbik9PntcbiAgICAgICAgICAgIHJldHVybiByb3V0ZU1vZHVsZS5oYW5kbGUobmV4dFJlcSwgY29udGV4dCkuZmluYWxseSgoKT0+e1xuICAgICAgICAgICAgICAgIGlmICghc3BhbikgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlcyh7XG4gICAgICAgICAgICAgICAgICAgICdodHRwLnN0YXR1c19jb2RlJzogcmVzLnN0YXR1c0NvZGUsXG4gICAgICAgICAgICAgICAgICAgICduZXh0LnJzYyc6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm9vdFNwYW5BdHRyaWJ1dGVzID0gdHJhY2VyLmdldFJvb3RTcGFuQXR0cmlidXRlcygpO1xuICAgICAgICAgICAgICAgIC8vIFdlIHdlcmUgdW5hYmxlIHRvIGdldCBhdHRyaWJ1dGVzLCBwcm9iYWJseSBPVEVMIGlzIG5vdCBlbmFibGVkXG4gICAgICAgICAgICAgICAgaWYgKCFyb290U3BhbkF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocm9vdFNwYW5BdHRyaWJ1dGVzLmdldCgnbmV4dC5zcGFuX3R5cGUnKSAhPT0gQmFzZVNlcnZlclNwYW4uaGFuZGxlUmVxdWVzdCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFVuZXhwZWN0ZWQgcm9vdCBzcGFuIHR5cGUgJyR7cm9vdFNwYW5BdHRyaWJ1dGVzLmdldCgnbmV4dC5zcGFuX3R5cGUnKX0nLiBQbGVhc2UgcmVwb3J0IHRoaXMgTmV4dC5qcyBpc3N1ZSBodHRwczovL2dpdGh1Yi5jb20vdmVyY2VsL25leHQuanNgKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByb3V0ZSA9IHJvb3RTcGFuQXR0cmlidXRlcy5nZXQoJ25leHQucm91dGUnKTtcbiAgICAgICAgICAgICAgICBpZiAocm91dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGAke21ldGhvZH0gJHtyb3V0ZX1gO1xuICAgICAgICAgICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZXMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ25leHQucm91dGUnOiByb3V0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdodHRwLnJvdXRlJzogcm91dGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAnbmV4dC5zcGFuX25hbWUnOiBuYW1lXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzcGFuLnVwZGF0ZU5hbWUobmFtZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3Bhbi51cGRhdGVOYW1lKGAke21ldGhvZH0gJHtyZXEudXJsfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBoYW5kbGVSZXNwb25zZSA9IGFzeW5jIChjdXJyZW50U3Bhbik9PntcbiAgICAgICAgICAgIHZhciBfY2FjaGVFbnRyeV92YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlR2VuZXJhdG9yID0gYXN5bmMgKHsgcHJldmlvdXNDYWNoZUVudHJ5IH0pPT57XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFnZXRSZXF1ZXN0TWV0YShyZXEsICdtaW5pbWFsTW9kZScpICYmIGlzT25EZW1hbmRSZXZhbGlkYXRlICYmIHJldmFsaWRhdGVPbmx5R2VuZXJhdGVkICYmICFwcmV2aW91c0NhY2hlRW50cnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXNDb2RlID0gNDA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb24tZGVtYW5kIHJldmFsaWRhdGUgYWx3YXlzIHNldHMgdGhpcyBoZWFkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ3gtbmV4dGpzLWNhY2hlJywgJ1JFVkFMSURBVEVEJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuZW5kKCdUaGlzIHBhZ2UgY291bGQgbm90IGJlIGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGludm9rZVJvdXRlTW9kdWxlKGN1cnJlbnRTcGFuKTtcbiAgICAgICAgICAgICAgICAgICAgcmVxLmZldGNoTWV0cmljcyA9IGNvbnRleHQucmVuZGVyT3B0cy5mZXRjaE1ldHJpY3M7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwZW5kaW5nV2FpdFVudGlsID0gY29udGV4dC5yZW5kZXJPcHRzLnBlbmRpbmdXYWl0VW50aWw7XG4gICAgICAgICAgICAgICAgICAgIC8vIEF0dGVtcHQgdXNpbmcgcHJvdmlkZWQgd2FpdFVudGlsIGlmIGF2YWlsYWJsZVxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBpdCdzIG5vdCB3ZSBmYWxsYmFjayB0byBzZW5kUmVzcG9uc2UncyBoYW5kbGluZ1xuICAgICAgICAgICAgICAgICAgICBpZiAocGVuZGluZ1dhaXRVbnRpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0eC53YWl0VW50aWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHgud2FpdFVudGlsKHBlbmRpbmdXYWl0VW50aWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlbmRpbmdXYWl0VW50aWwgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FjaGVUYWdzID0gY29udGV4dC5yZW5kZXJPcHRzLmNvbGxlY3RlZFRhZ3M7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSByZXF1ZXN0IGlzIGZvciBhIHN0YXRpYyByZXNwb25zZSwgd2UgY2FuIGNhY2hlIGl0IHNvIGxvbmdcbiAgICAgICAgICAgICAgICAgICAgLy8gYXMgaXQncyBub3QgZWRnZS5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzSXNyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBibG9iID0gYXdhaXQgcmVzcG9uc2UuYmxvYigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ29weSB0aGUgaGVhZGVycyBmcm9tIHRoZSByZXNwb25zZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSB0b05vZGVPdXRnb2luZ0h0dHBIZWFkZXJzKHJlc3BvbnNlLmhlYWRlcnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhY2hlVGFncykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnNbTkVYVF9DQUNIRV9UQUdTX0hFQURFUl0gPSBjYWNoZVRhZ3M7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddICYmIGJsb2IudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddID0gYmxvYi50eXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmV2YWxpZGF0ZSA9IHR5cGVvZiBjb250ZXh0LnJlbmRlck9wdHMuY29sbGVjdGVkUmV2YWxpZGF0ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgY29udGV4dC5yZW5kZXJPcHRzLmNvbGxlY3RlZFJldmFsaWRhdGUgPj0gSU5GSU5JVEVfQ0FDSEUgPyBmYWxzZSA6IGNvbnRleHQucmVuZGVyT3B0cy5jb2xsZWN0ZWRSZXZhbGlkYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhwaXJlID0gdHlwZW9mIGNvbnRleHQucmVuZGVyT3B0cy5jb2xsZWN0ZWRFeHBpcmUgPT09ICd1bmRlZmluZWQnIHx8IGNvbnRleHQucmVuZGVyT3B0cy5jb2xsZWN0ZWRFeHBpcmUgPj0gSU5GSU5JVEVfQ0FDSEUgPyB1bmRlZmluZWQgOiBjb250ZXh0LnJlbmRlck9wdHMuY29sbGVjdGVkRXhwaXJlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBjYWNoZSBlbnRyeSBmb3IgdGhlIHJlc3BvbnNlLlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FjaGVFbnRyeSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBraW5kOiBDYWNoZWRSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogQnVmZmVyLmZyb20oYXdhaXQgYmxvYi5hcnJheUJ1ZmZlcigpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGVDb250cm9sOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldmFsaWRhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGlyZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGVFbnRyeTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlbmQgcmVzcG9uc2Ugd2l0aG91dCBjYWNoaW5nIGlmIG5vdCBJU1JcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHNlbmRSZXNwb25zZShub2RlTmV4dFJlcSwgbm9kZU5leHRSZXMsIHJlc3BvbnNlLCBjb250ZXh0LnJlbmRlck9wdHMucGVuZGluZ1dhaXRVbnRpbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGlzIGlzIGEgYmFja2dyb3VuZCByZXZhbGlkYXRlIHdlIG5lZWQgdG8gcmVwb3J0XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSByZXF1ZXN0IGVycm9yIGhlcmUgYXMgaXQgd29uJ3QgYmUgYnViYmxlZFxuICAgICAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNDYWNoZUVudHJ5ID09IG51bGwgPyB2b2lkIDAgOiBwcmV2aW91c0NhY2hlRW50cnkuaXNTdGFsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgcm91dGVNb2R1bGUub25SZXF1ZXN0RXJyb3IocmVxLCBlcnIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3V0ZXJLaW5kOiAnQXBwIFJvdXRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm91dGVQYXRoOiBzcmNQYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlVHlwZTogJ3JvdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZhbGlkYXRlUmVhc29uOiBnZXRSZXZhbGlkYXRlUmVhc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNSZXZhbGlkYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc09uRGVtYW5kUmV2YWxpZGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCByb3V0ZXJTZXJ2ZXJDb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IGNhY2hlRW50cnkgPSBhd2FpdCByb3V0ZU1vZHVsZS5oYW5kbGVSZXNwb25zZSh7XG4gICAgICAgICAgICAgICAgcmVxLFxuICAgICAgICAgICAgICAgIG5leHRDb25maWcsXG4gICAgICAgICAgICAgICAgY2FjaGVLZXksXG4gICAgICAgICAgICAgICAgcm91dGVLaW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICAgICAgICAgIGlzRmFsbGJhY2s6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHByZXJlbmRlck1hbmlmZXN0LFxuICAgICAgICAgICAgICAgIGlzUm91dGVQUFJFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBpc09uRGVtYW5kUmV2YWxpZGF0ZSxcbiAgICAgICAgICAgICAgICByZXZhbGlkYXRlT25seUdlbmVyYXRlZCxcbiAgICAgICAgICAgICAgICByZXNwb25zZUdlbmVyYXRvcixcbiAgICAgICAgICAgICAgICB3YWl0VW50aWw6IGN0eC53YWl0VW50aWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gd2UgZG9uJ3QgY3JlYXRlIGEgY2FjaGVFbnRyeSBmb3IgSVNSXG4gICAgICAgICAgICBpZiAoIWlzSXNyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKGNhY2hlRW50cnkgPT0gbnVsbCA/IHZvaWQgMCA6IChfY2FjaGVFbnRyeV92YWx1ZSA9IGNhY2hlRW50cnkudmFsdWUpID09IG51bGwgPyB2b2lkIDAgOiBfY2FjaGVFbnRyeV92YWx1ZS5raW5kKSAhPT0gQ2FjaGVkUm91dGVLaW5kLkFQUF9ST1VURSkge1xuICAgICAgICAgICAgICAgIHZhciBfY2FjaGVFbnRyeV92YWx1ZTE7XG4gICAgICAgICAgICAgICAgdGhyb3cgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5ldyBFcnJvcihgSW52YXJpYW50OiBhcHAtcm91dGUgcmVjZWl2ZWQgaW52YWxpZCBjYWNoZSBlbnRyeSAke2NhY2hlRW50cnkgPT0gbnVsbCA/IHZvaWQgMCA6IChfY2FjaGVFbnRyeV92YWx1ZTEgPSBjYWNoZUVudHJ5LnZhbHVlKSA9PSBudWxsID8gdm9pZCAwIDogX2NhY2hlRW50cnlfdmFsdWUxLmtpbmR9YCksIFwiX19ORVhUX0VSUk9SX0NPREVcIiwge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJFNzAxXCIsXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZ2V0UmVxdWVzdE1ldGEocmVxLCAnbWluaW1hbE1vZGUnKSkge1xuICAgICAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ3gtbmV4dGpzLWNhY2hlJywgaXNPbkRlbWFuZFJldmFsaWRhdGUgPyAnUkVWQUxJREFURUQnIDogY2FjaGVFbnRyeS5pc01pc3MgPyAnTUlTUycgOiBjYWNoZUVudHJ5LmlzU3RhbGUgPyAnU1RBTEUnIDogJ0hJVCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRHJhZnQgbW9kZSBzaG91bGQgbmV2ZXIgYmUgY2FjaGVkXG4gICAgICAgICAgICBpZiAoaXNEcmFmdE1vZGUpIHtcbiAgICAgICAgICAgICAgICByZXMuc2V0SGVhZGVyKCdDYWNoZS1Db250cm9sJywgJ3ByaXZhdGUsIG5vLWNhY2hlLCBuby1zdG9yZSwgbWF4LWFnZT0wLCBtdXN0LXJldmFsaWRhdGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSBmcm9tTm9kZU91dGdvaW5nSHR0cEhlYWRlcnMoY2FjaGVFbnRyeS52YWx1ZS5oZWFkZXJzKTtcbiAgICAgICAgICAgIGlmICghKGdldFJlcXVlc3RNZXRhKHJlcSwgJ21pbmltYWxNb2RlJykgJiYgaXNJc3IpKSB7XG4gICAgICAgICAgICAgICAgaGVhZGVycy5kZWxldGUoTkVYVF9DQUNIRV9UQUdTX0hFQURFUik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiBjYWNoZSBjb250cm9sIGlzIGFscmVhZHkgc2V0IG9uIHRoZSByZXNwb25zZSB3ZSBkb24ndFxuICAgICAgICAgICAgLy8gb3ZlcnJpZGUgaXQgdG8gYWxsb3cgdXNlcnMgdG8gY3VzdG9taXplIGl0IHZpYSBuZXh0LmNvbmZpZ1xuICAgICAgICAgICAgaWYgKGNhY2hlRW50cnkuY2FjaGVDb250cm9sICYmICFyZXMuZ2V0SGVhZGVyKCdDYWNoZS1Db250cm9sJykgJiYgIWhlYWRlcnMuZ2V0KCdDYWNoZS1Db250cm9sJykpIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzLnNldCgnQ2FjaGUtQ29udHJvbCcsIGdldENhY2hlQ29udHJvbEhlYWRlcihjYWNoZUVudHJ5LmNhY2hlQ29udHJvbCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXdhaXQgc2VuZFJlc3BvbnNlKG5vZGVOZXh0UmVxLCBub2RlTmV4dFJlcywgbmV3IFJlc3BvbnNlKGNhY2hlRW50cnkudmFsdWUuYm9keSwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnMsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiBjYWNoZUVudHJ5LnZhbHVlLnN0YXR1cyB8fCAyMDBcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgICAgICAvLyBUT0RPOiBhY3RpdmVTcGFuIGNvZGUgcGF0aCBpcyBmb3Igd2hlbiB3cmFwcGVkIGJ5XG4gICAgICAgIC8vIG5leHQtc2VydmVyIGNhbiBiZSByZW1vdmVkIHdoZW4gdGhpcyBpcyBubyBsb25nZXIgdXNlZFxuICAgICAgICBpZiAoYWN0aXZlU3Bhbikge1xuICAgICAgICAgICAgYXdhaXQgaGFuZGxlUmVzcG9uc2UoYWN0aXZlU3Bhbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhd2FpdCB0cmFjZXIud2l0aFByb3BhZ2F0ZWRDb250ZXh0KHJlcS5oZWFkZXJzLCAoKT0+dHJhY2VyLnRyYWNlKEJhc2VTZXJ2ZXJTcGFuLmhhbmRsZVJlcXVlc3QsIHtcbiAgICAgICAgICAgICAgICAgICAgc3Bhbk5hbWU6IGAke21ldGhvZH0gJHtyZXEudXJsfWAsXG4gICAgICAgICAgICAgICAgICAgIGtpbmQ6IFNwYW5LaW5kLlNFUlZFUixcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2h0dHAubWV0aG9kJzogbWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2h0dHAudGFyZ2V0JzogcmVxLnVybFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgaGFuZGxlUmVzcG9uc2UpKTtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBpZiAoIShlcnIgaW5zdGFuY2VvZiBOb0ZhbGxiYWNrRXJyb3IpKSB7XG4gICAgICAgICAgICBhd2FpdCByb3V0ZU1vZHVsZS5vblJlcXVlc3RFcnJvcihyZXEsIGVyciwge1xuICAgICAgICAgICAgICAgIHJvdXRlcktpbmQ6ICdBcHAgUm91dGVyJyxcbiAgICAgICAgICAgICAgICByb3V0ZVBhdGg6IG5vcm1hbGl6ZWRTcmNQYWdlLFxuICAgICAgICAgICAgICAgIHJvdXRlVHlwZTogJ3JvdXRlJyxcbiAgICAgICAgICAgICAgICByZXZhbGlkYXRlUmVhc29uOiBnZXRSZXZhbGlkYXRlUmVhc29uKHtcbiAgICAgICAgICAgICAgICAgICAgaXNSZXZhbGlkYXRlLFxuICAgICAgICAgICAgICAgICAgICBpc09uRGVtYW5kUmV2YWxpZGF0ZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyByZXRocm93IHNvIHRoYXQgd2UgY2FuIGhhbmRsZSBzZXJ2aW5nIGVycm9yIHBhZ2VcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBkdXJpbmcgc3RhdGljIGdlbmVyYXRpb24sIHRocm93IHRoZSBlcnJvciBhZ2Fpbi5cbiAgICAgICAgaWYgKGlzSXNyKSB0aHJvdyBlcnI7XG4gICAgICAgIC8vIE90aGVyd2lzZSwgc2VuZCBhIDUwMCByZXNwb25zZS5cbiAgICAgICAgYXdhaXQgc2VuZFJlc3BvbnNlKG5vZGVOZXh0UmVxLCBub2RlTmV4dFJlcywgbmV3IFJlc3BvbnNlKG51bGwsIHtcbiAgICAgICAgICAgIHN0YXR1czogNTAwXG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwXG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fanalyze%2Froute&page=%2Fapi%2Fanalyze%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fanalyze%2Froute.ts&appDir=C%3A%5CUsers%5CHP%5CDesktop%5Cweb%20dev%5CChatlytics%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHP%5CDesktop%5Cweb%20dev%5CChatlytics&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/server/app-render/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/action-async-storage.external.js");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "./work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "?32c4":
/*!****************************!*\
  !*** bufferutil (ignored) ***!
  \****************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?66e9":
/*!********************************!*\
  !*** utf-8-validate (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "fs/promises":
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("fs/promises");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "next/dist/shared/lib/no-fallback-error.external":
/*!******************************************************************!*\
  !*** external "next/dist/shared/lib/no-fallback-error.external" ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/no-fallback-error.external");

/***/ }),

/***/ "next/dist/shared/lib/router/utils/app-paths":
/*!**************************************************************!*\
  !*** external "next/dist/shared/lib/router/utils/app-paths" ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/app-paths");

/***/ }),

/***/ "node:buffer":
/*!******************************!*\
  !*** external "node:buffer" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:buffer");

/***/ }),

/***/ "node:fs":
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),

/***/ "node:http":
/*!****************************!*\
  !*** external "node:http" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:http");

/***/ }),

/***/ "node:https":
/*!*****************************!*\
  !*** external "node:https" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:https");

/***/ }),

/***/ "node:net":
/*!***************************!*\
  !*** external "node:net" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:net");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ "node:process":
/*!*******************************!*\
  !*** external "node:process" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:process");

/***/ }),

/***/ "node:stream":
/*!******************************!*\
  !*** external "node:stream" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream");

/***/ }),

/***/ "node:stream/promises":
/*!***************************************!*\
  !*** external "node:stream/promises" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream/promises");

/***/ }),

/***/ "node:stream/web":
/*!**********************************!*\
  !*** external "node:stream/web" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream/web");

/***/ }),

/***/ "node:url":
/*!***************************!*\
  !*** external "node:url" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:url");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:util");

/***/ }),

/***/ "node:zlib":
/*!****************************!*\
  !*** external "node:zlib" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:zlib");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "worker_threads":
/*!*********************************!*\
  !*** external "worker_threads" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("worker_threads");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@pinecone-database","vendor-chunks/google-auth-library","vendor-chunks/ws","vendor-chunks/gaxios","vendor-chunks/jws","vendor-chunks/retry","vendor-chunks/json-bigint","vendor-chunks/google-logging-utils","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/@google","vendor-chunks/safe-buffer","vendor-chunks/p-retry","vendor-chunks/jwa","vendor-chunks/extend","vendor-chunks/buffer-equal-constant-time","vendor-chunks/bignumber.js","vendor-chunks/base64-js"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fanalyze%2Froute&page=%2Fapi%2Fanalyze%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fanalyze%2Froute.ts&appDir=C%3A%5CUsers%5CHP%5CDesktop%5Cweb%20dev%5CChatlytics%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHP%5CDesktop%5Cweb%20dev%5CChatlytics&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=!")));
module.exports = __webpack_exports__;

})();