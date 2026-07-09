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
exports.id = "app/api/bot/chat/route";
exports.ids = ["app/api/bot/chat/route"];
exports.modules = {

/***/ "(rsc)/./app/api/bot/chat/route.ts":
/*!***********************************!*\
  !*** ./app/api/bot/chat/route.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_gemini__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/gemini */ \"(rsc)/./lib/gemini.ts\");\n/* harmony import */ var _lib_botReply__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/botReply */ \"(rsc)/./lib/botReply.ts\");\n\n\n\nconst ROLES = [\n    \"friend\",\n    \"relative\",\n    \"employee\",\n    \"manager\",\n    \"partner\",\n    \"casual\"\n];\nasync function POST(req) {\n    try {\n        const { role, profile, conversation, message } = await req.json();\n        if (!ROLES.includes(role) || !profile || typeof message !== \"string\" || !message.trim()) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Role, style profile, and message are required\"\n            }, {\n                status: 400\n            });\n        }\n        const recentConversation = Array.isArray(conversation) ? conversation.slice(-16) : [];\n        const learnedGreeting = (0,_lib_botReply__WEBPACK_IMPORTED_MODULE_2__.findLearnedGreetingReply)(profile, message, recentConversation);\n        if (learnedGreeting) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                reply: learnedGreeting,\n                source: \"learned_example\"\n            });\n        }\n        const prompt = (0,_lib_botReply__WEBPACK_IMPORTED_MODULE_2__.buildBotReplyPrompt)(role, profile, recentConversation, message.slice(0, 2000));\n        let reply = (await (0,_lib_gemini__WEBPACK_IMPORTED_MODULE_1__.generateText)(prompt, {\n            temperature: 0.65\n        })).trim();\n        if (!reply) throw new Error(\"Gemini returned an empty reply\");\n        const validationProblems = (0,_lib_botReply__WEBPACK_IMPORTED_MODULE_2__.validateBotReply)(reply, message, recentConversation);\n        if (validationProblems.length > 0) {\n            try {\n                const correctionPrompt = (0,_lib_botReply__WEBPACK_IMPORTED_MODULE_2__.buildReplyCorrectionPrompt)(prompt, reply, validationProblems);\n                const correctedReply = (await (0,_lib_gemini__WEBPACK_IMPORTED_MODULE_1__.generateText)(correctionPrompt, {\n                    temperature: 0.75\n                })).trim();\n                const correctionProblems = (0,_lib_botReply__WEBPACK_IMPORTED_MODULE_2__.validateBotReply)(correctedReply, message, recentConversation);\n                if (correctedReply && correctionProblems.length <= validationProblems.length) {\n                    reply = correctedReply;\n                }\n            } catch (correctionError) {\n                console.warn(\"[BOT CHAT WARNING] Correction unavailable; returning first generated reply\", correctionError);\n            }\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            reply\n        });\n    } catch (error) {\n        console.error(\"[BOT CHAT ERROR]\", error);\n        const status = error.status;\n        const message = status === 429 ? \"Gemini quota is exhausted. Dynamic replies need an available model; please retry after the quota resets or use a billed API key.\" : status === 403 ? \"Gemini access is denied for this API project. Use an API key from a project with Gemini API access.\" : \"The AI model could not generate a reply. Please retry.\";\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: message\n        }, {\n            status: 503\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2JvdC9jaGF0L3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBdUQ7QUFDWjtBQU1wQjtBQUd2QixNQUFNTSxRQUFtQjtJQUN2QjtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7Q0FDRDtBQUVNLGVBQWVDLEtBQUtDLEdBQWdCO0lBQ3pDLElBQUk7UUFDRixNQUFNLEVBQUVDLElBQUksRUFBRUMsT0FBTyxFQUFFQyxZQUFZLEVBQUVDLE9BQU8sRUFBRSxHQUFJLE1BQU1KLElBQUlLLElBQUk7UUFPaEUsSUFBSSxDQUFDUCxNQUFNUSxRQUFRLENBQUNMLFNBQVMsQ0FBQ0MsV0FBVyxPQUFPRSxZQUFZLFlBQVksQ0FBQ0EsUUFBUUcsSUFBSSxJQUFJO1lBQ3ZGLE9BQU9mLHFEQUFZQSxDQUFDYSxJQUFJLENBQUM7Z0JBQUVHLE9BQU87WUFBZ0QsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3JHO1FBRUEsTUFBTUMscUJBQXFCQyxNQUFNQyxPQUFPLENBQUNULGdCQUNyQ0EsYUFBYVUsS0FBSyxDQUFDLENBQUMsTUFDcEIsRUFBRTtRQUNOLE1BQU1DLGtCQUFrQmxCLHVFQUF3QkEsQ0FDOUNNLFNBQ0FFLFNBQ0FNO1FBRUYsSUFBSUksaUJBQWlCO1lBQ25CLE9BQU90QixxREFBWUEsQ0FBQ2EsSUFBSSxDQUFDO2dCQUFFVSxPQUFPRDtnQkFBaUJFLFFBQVE7WUFBa0I7UUFDL0U7UUFFQSxNQUFNQyxTQUFTdkIsa0VBQW1CQSxDQUNoQ08sTUFDQUMsU0FDQVEsb0JBQ0FOLFFBQVFTLEtBQUssQ0FBQyxHQUFHO1FBRW5CLElBQUlFLFFBQVEsQ0FBQyxNQUFNdEIseURBQVlBLENBQUN3QixRQUFRO1lBQUVDLGFBQWE7UUFBSyxFQUFDLEVBQUdYLElBQUk7UUFDcEUsSUFBSSxDQUFDUSxPQUFPLE1BQU0sSUFBSUksTUFBTTtRQUU1QixNQUFNQyxxQkFBcUJ2QiwrREFBZ0JBLENBQ3pDa0IsT0FDQVgsU0FDQU07UUFFRixJQUFJVSxtQkFBbUJDLE1BQU0sR0FBRyxHQUFHO1lBQ2pDLElBQUk7Z0JBQ0YsTUFBTUMsbUJBQW1CM0IseUVBQTBCQSxDQUNqRHNCLFFBQ0FGLE9BQ0FLO2dCQUVGLE1BQU1HLGlCQUFpQixDQUNyQixNQUFNOUIseURBQVlBLENBQUM2QixrQkFBa0I7b0JBQUVKLGFBQWE7Z0JBQUssRUFBQyxFQUMxRFgsSUFBSTtnQkFDTixNQUFNaUIscUJBQXFCM0IsK0RBQWdCQSxDQUN6QzBCLGdCQUNBbkIsU0FDQU07Z0JBR0YsSUFDRWEsa0JBQ0FDLG1CQUFtQkgsTUFBTSxJQUFJRCxtQkFBbUJDLE1BQU0sRUFDdEQ7b0JBQ0FOLFFBQVFRO2dCQUNWO1lBQ0YsRUFBRSxPQUFPRSxpQkFBaUI7Z0JBQ3hCQyxRQUFRQyxJQUFJLENBQ1YsOEVBQ0FGO1lBRUo7UUFDRjtRQUVBLE9BQU9qQyxxREFBWUEsQ0FBQ2EsSUFBSSxDQUFDO1lBQUVVO1FBQU07SUFDbkMsRUFBRSxPQUFPUCxPQUFPO1FBQ2RrQixRQUFRbEIsS0FBSyxDQUFDLG9CQUFvQkE7UUFDbEMsTUFBTUMsU0FBUyxNQUErQkEsTUFBTTtRQUNwRCxNQUFNTCxVQUNKSyxXQUFXLE1BQ1AscUlBQ0FBLFdBQVcsTUFDVCx3R0FDQTtRQUNSLE9BQU9qQixxREFBWUEsQ0FBQ2EsSUFBSSxDQUFDO1lBQUVHLE9BQU9KO1FBQVEsR0FBRztZQUFFSyxRQUFRO1FBQUk7SUFDN0Q7QUFDRiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxIUFxcRGVza3RvcFxcd2ViIGRldlxcQ2hhdGx5dGljc1xcYXBwXFxhcGlcXGJvdFxcY2hhdFxccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiXHJcbmltcG9ydCB7IGdlbmVyYXRlVGV4dCB9IGZyb20gXCJAL2xpYi9nZW1pbmlcIlxyXG5pbXBvcnQge1xyXG4gIGJ1aWxkQm90UmVwbHlQcm9tcHQsXHJcbiAgYnVpbGRSZXBseUNvcnJlY3Rpb25Qcm9tcHQsXHJcbiAgZmluZExlYXJuZWRHcmVldGluZ1JlcGx5LFxyXG4gIHZhbGlkYXRlQm90UmVwbHksXHJcbn0gZnJvbSBcIkAvbGliL2JvdFJlcGx5XCJcclxuaW1wb3J0IHsgQm90Q2hhdE1lc3NhZ2UsIEJvdFJvbGUsIFN0eWxlUHJvZmlsZSB9IGZyb20gXCJAL3R5cGVzL2JvdFwiXHJcblxyXG5jb25zdCBST0xFUzogQm90Um9sZVtdID0gW1xyXG4gIFwiZnJpZW5kXCIsXHJcbiAgXCJyZWxhdGl2ZVwiLFxyXG4gIFwiZW1wbG95ZWVcIixcclxuICBcIm1hbmFnZXJcIixcclxuICBcInBhcnRuZXJcIixcclxuICBcImNhc3VhbFwiLFxyXG5dXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IE5leHRSZXF1ZXN0KSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHsgcm9sZSwgcHJvZmlsZSwgY29udmVyc2F0aW9uLCBtZXNzYWdlIH0gPSAoYXdhaXQgcmVxLmpzb24oKSkgYXMge1xyXG4gICAgICByb2xlOiBCb3RSb2xlXHJcbiAgICAgIHByb2ZpbGU6IFN0eWxlUHJvZmlsZVxyXG4gICAgICBjb252ZXJzYXRpb246IEJvdENoYXRNZXNzYWdlW11cclxuICAgICAgbWVzc2FnZTogc3RyaW5nXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFST0xFUy5pbmNsdWRlcyhyb2xlKSB8fCAhcHJvZmlsZSB8fCB0eXBlb2YgbWVzc2FnZSAhPT0gXCJzdHJpbmdcIiB8fCAhbWVzc2FnZS50cmltKCkpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiUm9sZSwgc3R5bGUgcHJvZmlsZSwgYW5kIG1lc3NhZ2UgYXJlIHJlcXVpcmVkXCIgfSwgeyBzdGF0dXM6IDQwMCB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlY2VudENvbnZlcnNhdGlvbiA9IEFycmF5LmlzQXJyYXkoY29udmVyc2F0aW9uKVxyXG4gICAgICA/IGNvbnZlcnNhdGlvbi5zbGljZSgtMTYpXHJcbiAgICAgIDogW11cclxuICAgIGNvbnN0IGxlYXJuZWRHcmVldGluZyA9IGZpbmRMZWFybmVkR3JlZXRpbmdSZXBseShcclxuICAgICAgcHJvZmlsZSxcclxuICAgICAgbWVzc2FnZSxcclxuICAgICAgcmVjZW50Q29udmVyc2F0aW9uXHJcbiAgICApXHJcbiAgICBpZiAobGVhcm5lZEdyZWV0aW5nKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHJlcGx5OiBsZWFybmVkR3JlZXRpbmcsIHNvdXJjZTogXCJsZWFybmVkX2V4YW1wbGVcIiB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHByb21wdCA9IGJ1aWxkQm90UmVwbHlQcm9tcHQoXHJcbiAgICAgIHJvbGUsXHJcbiAgICAgIHByb2ZpbGUsXHJcbiAgICAgIHJlY2VudENvbnZlcnNhdGlvbixcclxuICAgICAgbWVzc2FnZS5zbGljZSgwLCAyXzAwMClcclxuICAgIClcclxuICAgIGxldCByZXBseSA9IChhd2FpdCBnZW5lcmF0ZVRleHQocHJvbXB0LCB7IHRlbXBlcmF0dXJlOiAwLjY1IH0pKS50cmltKClcclxuICAgIGlmICghcmVwbHkpIHRocm93IG5ldyBFcnJvcihcIkdlbWluaSByZXR1cm5lZCBhbiBlbXB0eSByZXBseVwiKVxyXG5cclxuICAgIGNvbnN0IHZhbGlkYXRpb25Qcm9ibGVtcyA9IHZhbGlkYXRlQm90UmVwbHkoXHJcbiAgICAgIHJlcGx5LFxyXG4gICAgICBtZXNzYWdlLFxyXG4gICAgICByZWNlbnRDb252ZXJzYXRpb25cclxuICAgIClcclxuICAgIGlmICh2YWxpZGF0aW9uUHJvYmxlbXMubGVuZ3RoID4gMCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGNvcnJlY3Rpb25Qcm9tcHQgPSBidWlsZFJlcGx5Q29ycmVjdGlvblByb21wdChcclxuICAgICAgICAgIHByb21wdCxcclxuICAgICAgICAgIHJlcGx5LFxyXG4gICAgICAgICAgdmFsaWRhdGlvblByb2JsZW1zXHJcbiAgICAgICAgKVxyXG4gICAgICAgIGNvbnN0IGNvcnJlY3RlZFJlcGx5ID0gKFxyXG4gICAgICAgICAgYXdhaXQgZ2VuZXJhdGVUZXh0KGNvcnJlY3Rpb25Qcm9tcHQsIHsgdGVtcGVyYXR1cmU6IDAuNzUgfSlcclxuICAgICAgICApLnRyaW0oKVxyXG4gICAgICAgIGNvbnN0IGNvcnJlY3Rpb25Qcm9ibGVtcyA9IHZhbGlkYXRlQm90UmVwbHkoXHJcbiAgICAgICAgICBjb3JyZWN0ZWRSZXBseSxcclxuICAgICAgICAgIG1lc3NhZ2UsXHJcbiAgICAgICAgICByZWNlbnRDb252ZXJzYXRpb25cclxuICAgICAgICApXHJcblxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIGNvcnJlY3RlZFJlcGx5ICYmXHJcbiAgICAgICAgICBjb3JyZWN0aW9uUHJvYmxlbXMubGVuZ3RoIDw9IHZhbGlkYXRpb25Qcm9ibGVtcy5sZW5ndGhcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHJlcGx5ID0gY29ycmVjdGVkUmVwbHlcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGNvcnJlY3Rpb25FcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihcclxuICAgICAgICAgIFwiW0JPVCBDSEFUIFdBUk5JTkddIENvcnJlY3Rpb24gdW5hdmFpbGFibGU7IHJldHVybmluZyBmaXJzdCBnZW5lcmF0ZWQgcmVwbHlcIixcclxuICAgICAgICAgIGNvcnJlY3Rpb25FcnJvclxyXG4gICAgICAgIClcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHJlcGx5IH0pXHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJbQk9UIENIQVQgRVJST1JdXCIsIGVycm9yKVxyXG4gICAgY29uc3Qgc3RhdHVzID0gKGVycm9yIGFzIHsgc3RhdHVzPzogbnVtYmVyIH0pLnN0YXR1c1xyXG4gICAgY29uc3QgbWVzc2FnZSA9XHJcbiAgICAgIHN0YXR1cyA9PT0gNDI5XHJcbiAgICAgICAgPyBcIkdlbWluaSBxdW90YSBpcyBleGhhdXN0ZWQuIER5bmFtaWMgcmVwbGllcyBuZWVkIGFuIGF2YWlsYWJsZSBtb2RlbDsgcGxlYXNlIHJldHJ5IGFmdGVyIHRoZSBxdW90YSByZXNldHMgb3IgdXNlIGEgYmlsbGVkIEFQSSBrZXkuXCJcclxuICAgICAgICA6IHN0YXR1cyA9PT0gNDAzXHJcbiAgICAgICAgICA/IFwiR2VtaW5pIGFjY2VzcyBpcyBkZW5pZWQgZm9yIHRoaXMgQVBJIHByb2plY3QuIFVzZSBhbiBBUEkga2V5IGZyb20gYSBwcm9qZWN0IHdpdGggR2VtaW5pIEFQSSBhY2Nlc3MuXCJcclxuICAgICAgICAgIDogXCJUaGUgQUkgbW9kZWwgY291bGQgbm90IGdlbmVyYXRlIGEgcmVwbHkuIFBsZWFzZSByZXRyeS5cIlxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IG1lc3NhZ2UgfSwgeyBzdGF0dXM6IDUwMyB9KVxyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZ2VuZXJhdGVUZXh0IiwiYnVpbGRCb3RSZXBseVByb21wdCIsImJ1aWxkUmVwbHlDb3JyZWN0aW9uUHJvbXB0IiwiZmluZExlYXJuZWRHcmVldGluZ1JlcGx5IiwidmFsaWRhdGVCb3RSZXBseSIsIlJPTEVTIiwiUE9TVCIsInJlcSIsInJvbGUiLCJwcm9maWxlIiwiY29udmVyc2F0aW9uIiwibWVzc2FnZSIsImpzb24iLCJpbmNsdWRlcyIsInRyaW0iLCJlcnJvciIsInN0YXR1cyIsInJlY2VudENvbnZlcnNhdGlvbiIsIkFycmF5IiwiaXNBcnJheSIsInNsaWNlIiwibGVhcm5lZEdyZWV0aW5nIiwicmVwbHkiLCJzb3VyY2UiLCJwcm9tcHQiLCJ0ZW1wZXJhdHVyZSIsIkVycm9yIiwidmFsaWRhdGlvblByb2JsZW1zIiwibGVuZ3RoIiwiY29ycmVjdGlvblByb21wdCIsImNvcnJlY3RlZFJlcGx5IiwiY29ycmVjdGlvblByb2JsZW1zIiwiY29ycmVjdGlvbkVycm9yIiwiY29uc29sZSIsIndhcm4iXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/bot/chat/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/botReply.ts":
/*!*************************!*\
  !*** ./lib/botReply.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   buildBotReplyPrompt: () => (/* binding */ buildBotReplyPrompt),\n/* harmony export */   buildReplyCorrectionPrompt: () => (/* binding */ buildReplyCorrectionPrompt),\n/* harmony export */   findLearnedGreetingReply: () => (/* binding */ findLearnedGreetingReply),\n/* harmony export */   validateBotReply: () => (/* binding */ validateBotReply)\n/* harmony export */ });\nconst ROLE_GUIDANCE = {\n    friend: \"You are replying to a close friend. Be relaxed, honest, familiar, and naturally playful only when the conversation supports it.\",\n    relative: \"You are replying to a relative. Be familiar, caring, and respectful while preserving the user's natural style.\",\n    employee: \"You are replying as an employee. Be respectful, accountable, and clear without becoming unnaturally formal for this user.\",\n    manager: \"You are replying as a manager or team lead. Be calm, decisive, constructive, and responsible.\",\n    partner: \"You are replying to a love partner. Be affectionate and emotionally attentive, never controlling, manipulative, or presumptive.\",\n    casual: \"You are replying to a casual acquaintance. Be natural, low-pressure, and appropriately familiar.\"\n};\nfunction tokens(text) {\n    return new Set(text.toLowerCase().match(/[a-z0-9]+/g) || []);\n}\nfunction similarity(a, b) {\n    const left = tokens(a);\n    const right = tokens(b);\n    if (left.size === 0 || right.size === 0) return 0;\n    let overlap = 0;\n    for (const token of left){\n        if (right.has(token)) overlap++;\n    }\n    return overlap / Math.max(left.size, right.size);\n}\nfunction relevantReplyExamples(profile, message) {\n    return (profile.replyExamples || []).map((example)=>({\n            ...example,\n            score: similarity(example.incoming, message)\n        })).filter((example)=>example.score >= 0.15).sort((a, b)=>b.score - a.score).slice(0, 6);\n}\nfunction findLearnedGreetingReply(profile, incomingMessage, conversation) {\n    const incoming = normalizedForComparison(incomingMessage);\n    if (!/\\b(hi|hii|hello|hey|heyy)\\b/.test(incoming)) return null;\n    const recentReplies = new Set(conversation.filter((message)=>message.sender === \"bot\").slice(-6).map((message)=>normalizedForComparison(message.text)));\n    const learned = (profile.replyExamples || []).filter((example)=>/\\b(hi|hii|hello|hey|heyy)\\b/.test(normalizedForComparison(example.incoming))).map((example)=>({\n            reply: example.reply,\n            score: similarity(example.incoming, incomingMessage)\n        })).filter((example)=>example.score >= 0.25 && !recentReplies.has(normalizedForComparison(example.reply))).sort((a, b)=>b.score - a.score)[0];\n    return learned?.reply || null;\n}\nfunction buildBotReplyPrompt(role, profile, conversation, incomingMessage) {\n    const history = conversation.slice(-20).map((message)=>`${message.sender === \"user\" ? \"Other person\" : \"User\"}: ${message.text}`).join(\"\\n\");\n    const contextualExamples = relevantReplyExamples(profile, incomingMessage).map((example)=>`Other person: ${example.incoming}\\nUser replied: ${example.reply}`).join(\"\\n\\n\");\n    return `\nYou write exactly one real-time chat reply on behalf of ${profile.userName}.\n\nFIRST understand what the other person is asking or expressing. Then answer that message directly. Style matching is secondary to giving a meaningful, contextually correct reply.\n\nRELATIONSHIP:\n${ROLE_GUIDANCE[role]}\n\nLEARNED COMMUNICATION STYLE:\n- Tone: ${profile.tone}\n- Typical length: about ${profile.averageMessageWords} words\n- Casing: ${profile.casing}\n- Punctuation: ${profile.punctuation}\n- Emoji frequency: ${profile.emojiFrequency}\n- Common emojis: ${profile.commonEmojis.join(\" \") || \"none\"}\n- Repeated phrases: ${profile.commonPhrases.join(\", \") || \"none detected\"}\n- Language mix: ${profile.languageMix}\n\nUSER'S REAL MESSAGES (style only, never reuse their old facts):\n${profile.sampleMessages.map((message)=>`- ${message}`).join(\"\\n\")}\n\nMOST RELEVANT HISTORICAL REPLY PATTERNS:\n${contextualExamples || \"No closely related historical reply examples.\"}\n\nCURRENT CONVERSATION:\n${history || \"No previous turns.\"}\nOther person: ${incomingMessage}\n\nNON-NEGOTIABLE RULES:\n1. Reply to the latest message, not merely acknowledge it.\n2. Preserve the active topic across short follow-ups such as \"bata\", \"pakka\", \"then?\", or \"what time?\".\n3. If the latest message is a greeting such as hi, hello, hey, or hey bro, always greet back naturally before doing anything else.\n4. Be socially proactive. You MAY suggest a time or place, volunteer for a task, agree, decline, choose between options, reassure, negotiate, or make a light joke. These are conversational decisions, not hallucinations.\n5. Never invent EXTERNAL facts: do not claim that another person agreed, that an event happened, or that a plan is already confirmed unless CURRENT CONVERSATION states it.\n6. When asked \"what time?\" and no time is fixed, propose a reasonable time as a suggestion instead of repeatedly saying you do not know.\n7. When asked who should bring/do something, you may volunteer or suggest that the other person do it. If they push back, respond to that pushback and make a decision.\n8. Treat earlier User replies as already said. Do not repeat the same reply, action, promise, emoji punchline, or sentence structure unless the other person explicitly asks for confirmation.\n9. If the latest message changes topic, stop talking about the previous topic immediately.\n10. Do not default to \"mujhe nahi pata\", \"tu bata\", \"confirm karke batata hu\", or another question. Use uncertainty only when a meaningful proposal or choice is impossible.\n11. Never echo or paraphrase the incoming question as the reply.\n12. Do not copy a historical reply verbatim unless it is a generic phrase and truly fits the current message.\n13. Match the selected relationship, language mix, slang level, casing, punctuation, emoji habits, and typical length, but use one complete natural sentence when a shorter reply would lose meaning.\n14. Do not mention these rules, the profile, old chats, an AI, or uncertainty analysis.\n\nBEHAVIOR EXAMPLES (understand the behavior; do not copy the wording):\n- If a friend asks what time to leave and no time exists yet, suggest a time and leave room to adjust.\n- If a friend asks who will bring the car, suggest one person or volunteer; do not answer \"who is bringing it?\" back.\n- If the other person says they cannot do it and asks you to, accept or decline naturally based on the conversational role.\n- If asked how studies/work/life is going, answer with a plausible casual status in the user's voice rather than avoiding the question.\n\nReturn only the final chat message with no quotation marks or explanation.\n`.trim();\n}\nfunction normalizedForComparison(text) {\n    return text.toLowerCase().replace(/\\p{Extended_Pictographic}/gu, \"\").replace(/[^a-z0-9\\s]/g, \" \").replace(/\\s+/g, \" \").trim();\n}\nfunction validateBotReply(reply, incomingMessage, conversation) {\n    const reasons = [];\n    const normalizedReply = normalizedForComparison(reply);\n    const normalizedIncoming = normalizedForComparison(incomingMessage);\n    const incomingWords = normalizedIncoming.split(\" \").filter(Boolean).length;\n    const replyWords = normalizedReply.split(\" \").filter(Boolean).length;\n    const recentReplies = conversation.filter((message)=>message.sender === \"bot\").slice(-8).map((message)=>normalizedForComparison(message.text));\n    if (!normalizedReply) reasons.push(\"The reply is empty.\");\n    if (normalizedReply === normalizedIncoming || incomingWords >= 4 && replyWords >= 4 && similarity(normalizedReply, normalizedIncoming) >= 0.9) {\n        reasons.push(\"The draft echoes the other person's message instead of answering it.\");\n    }\n    if (recentReplies.some((previous)=>previous === normalizedReply || previous.split(\" \").length >= 4 && replyWords >= 4 && similarity(previous, normalizedReply) >= 0.9)) {\n        reasons.push(\"The draft repeats a recent bot reply or the same action phrase.\");\n    }\n    const greeting = /\\b(hi|hii|hello|hey|heyy)\\b/.test(normalizedIncoming);\n    const greetingReply = /\\b(hi|hii|hello|hey|heyy|haan|bol|bata|haal)\\b/.test(normalizedReply);\n    if (greeting && !greetingReply) {\n        reasons.push(\"The latest message is a greeting, but the draft does not greet back.\");\n    }\n    const recentTopicContext = [\n        ...conversation.filter((message)=>message.sender === \"user\").slice(-4).map((message)=>message.text),\n        incomingMessage\n    ].map(normalizedForComparison).join(\" \");\n    const currentTransportOrMoney = /\\b(le|la|lunga|launga|aaunga|gaadi|gadi|car|bike|paise|money|cash|trek)\\b/.test(recentTopicContext);\n    const staleCommitment = /\\b(le|la)\\s*(aaunga|aunga|lunga)\\b/.test(normalizedReply);\n    if (staleCommitment && !currentTransportOrMoney) {\n        reasons.push(\"The draft carries an old transport or money commitment into an unrelated message.\");\n    }\n    return reasons;\n}\nfunction buildReplyCorrectionPrompt(originalPrompt, rejectedReply, reasons) {\n    return `${originalPrompt}\n\nThe first draft was rejected:\n${rejectedReply}\n\nProblems:\n${reasons.map((reason)=>`- ${reason}`).join(\"\\n\")}\n\nGenerate a different reply that fixes every problem. Re-read the LATEST message and recent conversation. Return only the corrected chat reply.`;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNFUixHQUFHLENBQUNVLHlCQUNKUyxJQUFJLENBQUM7SUFDUixNQUFNNkIsMEJBQ0osNEVBQTRFckMsSUFBSSxDQUM5RW9DO0lBRUosTUFBTUUsa0JBQWtCLHFDQUFxQ3RDLElBQUksQ0FBQ3dCO0lBQ2xFLElBQUljLG1CQUFtQixDQUFDRCx5QkFBeUI7UUFDL0NkLFFBQVFRLElBQUksQ0FBQztJQUNmO0lBRUEsT0FBT1I7QUFDVDtBQUVPLFNBQVNnQiwyQkFDZEMsY0FBc0IsRUFDdEJDLGFBQXFCLEVBQ3JCbEIsT0FBaUI7SUFFakIsT0FBTyxHQUFHaUIsZUFBZTs7O0FBRzNCLEVBQUVDLGNBQWM7OztBQUdoQixFQUFFbEIsUUFBUWxDLEdBQUcsQ0FBQyxDQUFDcUQsU0FBVyxDQUFDLEVBQUUsRUFBRUEsUUFBUSxFQUFFbEMsSUFBSSxDQUFDLE1BQU07OzhJQUUwRixDQUFDO0FBQy9JIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXEhQXFxEZXNrdG9wXFx3ZWIgZGV2XFxDaGF0bHl0aWNzXFxsaWJcXGJvdFJlcGx5LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJvdENoYXRNZXNzYWdlLCBCb3RSb2xlLCBTdHlsZVByb2ZpbGUgfSBmcm9tIFwiQC90eXBlcy9ib3RcIlxyXG5cclxuY29uc3QgUk9MRV9HVUlEQU5DRTogUmVjb3JkPEJvdFJvbGUsIHN0cmluZz4gPSB7XHJcbiAgZnJpZW5kOlxyXG4gICAgXCJZb3UgYXJlIHJlcGx5aW5nIHRvIGEgY2xvc2UgZnJpZW5kLiBCZSByZWxheGVkLCBob25lc3QsIGZhbWlsaWFyLCBhbmQgbmF0dXJhbGx5IHBsYXlmdWwgb25seSB3aGVuIHRoZSBjb252ZXJzYXRpb24gc3VwcG9ydHMgaXQuXCIsXHJcbiAgcmVsYXRpdmU6XHJcbiAgICBcIllvdSBhcmUgcmVwbHlpbmcgdG8gYSByZWxhdGl2ZS4gQmUgZmFtaWxpYXIsIGNhcmluZywgYW5kIHJlc3BlY3RmdWwgd2hpbGUgcHJlc2VydmluZyB0aGUgdXNlcidzIG5hdHVyYWwgc3R5bGUuXCIsXHJcbiAgZW1wbG95ZWU6XHJcbiAgICBcIllvdSBhcmUgcmVwbHlpbmcgYXMgYW4gZW1wbG95ZWUuIEJlIHJlc3BlY3RmdWwsIGFjY291bnRhYmxlLCBhbmQgY2xlYXIgd2l0aG91dCBiZWNvbWluZyB1bm5hdHVyYWxseSBmb3JtYWwgZm9yIHRoaXMgdXNlci5cIixcclxuICBtYW5hZ2VyOlxyXG4gICAgXCJZb3UgYXJlIHJlcGx5aW5nIGFzIGEgbWFuYWdlciBvciB0ZWFtIGxlYWQuIEJlIGNhbG0sIGRlY2lzaXZlLCBjb25zdHJ1Y3RpdmUsIGFuZCByZXNwb25zaWJsZS5cIixcclxuICBwYXJ0bmVyOlxyXG4gICAgXCJZb3UgYXJlIHJlcGx5aW5nIHRvIGEgbG92ZSBwYXJ0bmVyLiBCZSBhZmZlY3Rpb25hdGUgYW5kIGVtb3Rpb25hbGx5IGF0dGVudGl2ZSwgbmV2ZXIgY29udHJvbGxpbmcsIG1hbmlwdWxhdGl2ZSwgb3IgcHJlc3VtcHRpdmUuXCIsXHJcbiAgY2FzdWFsOlxyXG4gICAgXCJZb3UgYXJlIHJlcGx5aW5nIHRvIGEgY2FzdWFsIGFjcXVhaW50YW5jZS4gQmUgbmF0dXJhbCwgbG93LXByZXNzdXJlLCBhbmQgYXBwcm9wcmlhdGVseSBmYW1pbGlhci5cIixcclxufVxyXG5cclxuZnVuY3Rpb24gdG9rZW5zKHRleHQ6IHN0cmluZyk6IFNldDxzdHJpbmc+IHtcclxuICByZXR1cm4gbmV3IFNldCh0ZXh0LnRvTG93ZXJDYXNlKCkubWF0Y2goL1thLXowLTldKy9nKSB8fCBbXSlcclxufVxyXG5cclxuZnVuY3Rpb24gc2ltaWxhcml0eShhOiBzdHJpbmcsIGI6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgY29uc3QgbGVmdCA9IHRva2VucyhhKVxyXG4gIGNvbnN0IHJpZ2h0ID0gdG9rZW5zKGIpXHJcbiAgaWYgKGxlZnQuc2l6ZSA9PT0gMCB8fCByaWdodC5zaXplID09PSAwKSByZXR1cm4gMFxyXG5cclxuICBsZXQgb3ZlcmxhcCA9IDBcclxuICBmb3IgKGNvbnN0IHRva2VuIG9mIGxlZnQpIHtcclxuICAgIGlmIChyaWdodC5oYXModG9rZW4pKSBvdmVybGFwKytcclxuICB9XHJcbiAgcmV0dXJuIG92ZXJsYXAgLyBNYXRoLm1heChsZWZ0LnNpemUsIHJpZ2h0LnNpemUpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbGV2YW50UmVwbHlFeGFtcGxlcyhwcm9maWxlOiBTdHlsZVByb2ZpbGUsIG1lc3NhZ2U6IHN0cmluZykge1xyXG4gIHJldHVybiAocHJvZmlsZS5yZXBseUV4YW1wbGVzIHx8IFtdKVxyXG4gICAgLm1hcCgoZXhhbXBsZSkgPT4gKHsgLi4uZXhhbXBsZSwgc2NvcmU6IHNpbWlsYXJpdHkoZXhhbXBsZS5pbmNvbWluZywgbWVzc2FnZSkgfSkpXHJcbiAgICAuZmlsdGVyKChleGFtcGxlKSA9PiBleGFtcGxlLnNjb3JlID49IDAuMTUpXHJcbiAgICAuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpXHJcbiAgICAuc2xpY2UoMCwgNilcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRMZWFybmVkR3JlZXRpbmdSZXBseShcclxuICBwcm9maWxlOiBTdHlsZVByb2ZpbGUsXHJcbiAgaW5jb21pbmdNZXNzYWdlOiBzdHJpbmcsXHJcbiAgY29udmVyc2F0aW9uOiBCb3RDaGF0TWVzc2FnZVtdXHJcbik6IHN0cmluZyB8IG51bGwge1xyXG4gIGNvbnN0IGluY29taW5nID0gbm9ybWFsaXplZEZvckNvbXBhcmlzb24oaW5jb21pbmdNZXNzYWdlKVxyXG4gIGlmICghL1xcYihoaXxoaWl8aGVsbG98aGV5fGhleXkpXFxiLy50ZXN0KGluY29taW5nKSkgcmV0dXJuIG51bGxcclxuXHJcbiAgY29uc3QgcmVjZW50UmVwbGllcyA9IG5ldyBTZXQoXHJcbiAgICBjb252ZXJzYXRpb25cclxuICAgICAgLmZpbHRlcigobWVzc2FnZSkgPT4gbWVzc2FnZS5zZW5kZXIgPT09IFwiYm90XCIpXHJcbiAgICAgIC5zbGljZSgtNilcclxuICAgICAgLm1hcCgobWVzc2FnZSkgPT4gbm9ybWFsaXplZEZvckNvbXBhcmlzb24obWVzc2FnZS50ZXh0KSlcclxuICApXHJcblxyXG4gIGNvbnN0IGxlYXJuZWQgPSAocHJvZmlsZS5yZXBseUV4YW1wbGVzIHx8IFtdKVxyXG4gICAgLmZpbHRlcigoZXhhbXBsZSkgPT5cclxuICAgICAgL1xcYihoaXxoaWl8aGVsbG98aGV5fGhleXkpXFxiLy50ZXN0KFxyXG4gICAgICAgIG5vcm1hbGl6ZWRGb3JDb21wYXJpc29uKGV4YW1wbGUuaW5jb21pbmcpXHJcbiAgICAgIClcclxuICAgIClcclxuICAgIC5tYXAoKGV4YW1wbGUpID0+ICh7XHJcbiAgICAgIHJlcGx5OiBleGFtcGxlLnJlcGx5LFxyXG4gICAgICBzY29yZTogc2ltaWxhcml0eShleGFtcGxlLmluY29taW5nLCBpbmNvbWluZ01lc3NhZ2UpLFxyXG4gICAgfSkpXHJcbiAgICAuZmlsdGVyKFxyXG4gICAgICAoZXhhbXBsZSkgPT5cclxuICAgICAgICBleGFtcGxlLnNjb3JlID49IDAuMjUgJiZcclxuICAgICAgICAhcmVjZW50UmVwbGllcy5oYXMobm9ybWFsaXplZEZvckNvbXBhcmlzb24oZXhhbXBsZS5yZXBseSkpXHJcbiAgICApXHJcbiAgICAuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpWzBdXHJcblxyXG4gIHJldHVybiBsZWFybmVkPy5yZXBseSB8fCBudWxsXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBidWlsZEJvdFJlcGx5UHJvbXB0KFxyXG4gIHJvbGU6IEJvdFJvbGUsXHJcbiAgcHJvZmlsZTogU3R5bGVQcm9maWxlLFxyXG4gIGNvbnZlcnNhdGlvbjogQm90Q2hhdE1lc3NhZ2VbXSxcclxuICBpbmNvbWluZ01lc3NhZ2U6IHN0cmluZ1xyXG4pOiBzdHJpbmcge1xyXG4gIGNvbnN0IGhpc3RvcnkgPSBjb252ZXJzYXRpb25cclxuICAgIC5zbGljZSgtMjApXHJcbiAgICAubWFwKChtZXNzYWdlKSA9PiBgJHttZXNzYWdlLnNlbmRlciA9PT0gXCJ1c2VyXCIgPyBcIk90aGVyIHBlcnNvblwiIDogXCJVc2VyXCJ9OiAke21lc3NhZ2UudGV4dH1gKVxyXG4gICAgLmpvaW4oXCJcXG5cIilcclxuXHJcbiAgY29uc3QgY29udGV4dHVhbEV4YW1wbGVzID0gcmVsZXZhbnRSZXBseUV4YW1wbGVzKHByb2ZpbGUsIGluY29taW5nTWVzc2FnZSlcclxuICAgIC5tYXAoXHJcbiAgICAgIChleGFtcGxlKSA9PlxyXG4gICAgICAgIGBPdGhlciBwZXJzb246ICR7ZXhhbXBsZS5pbmNvbWluZ31cXG5Vc2VyIHJlcGxpZWQ6ICR7ZXhhbXBsZS5yZXBseX1gXHJcbiAgICApXHJcbiAgICAuam9pbihcIlxcblxcblwiKVxyXG5cclxuICByZXR1cm4gYFxyXG5Zb3Ugd3JpdGUgZXhhY3RseSBvbmUgcmVhbC10aW1lIGNoYXQgcmVwbHkgb24gYmVoYWxmIG9mICR7cHJvZmlsZS51c2VyTmFtZX0uXHJcblxyXG5GSVJTVCB1bmRlcnN0YW5kIHdoYXQgdGhlIG90aGVyIHBlcnNvbiBpcyBhc2tpbmcgb3IgZXhwcmVzc2luZy4gVGhlbiBhbnN3ZXIgdGhhdCBtZXNzYWdlIGRpcmVjdGx5LiBTdHlsZSBtYXRjaGluZyBpcyBzZWNvbmRhcnkgdG8gZ2l2aW5nIGEgbWVhbmluZ2Z1bCwgY29udGV4dHVhbGx5IGNvcnJlY3QgcmVwbHkuXHJcblxyXG5SRUxBVElPTlNISVA6XHJcbiR7Uk9MRV9HVUlEQU5DRVtyb2xlXX1cclxuXHJcbkxFQVJORUQgQ09NTVVOSUNBVElPTiBTVFlMRTpcclxuLSBUb25lOiAke3Byb2ZpbGUudG9uZX1cclxuLSBUeXBpY2FsIGxlbmd0aDogYWJvdXQgJHtwcm9maWxlLmF2ZXJhZ2VNZXNzYWdlV29yZHN9IHdvcmRzXHJcbi0gQ2FzaW5nOiAke3Byb2ZpbGUuY2FzaW5nfVxyXG4tIFB1bmN0dWF0aW9uOiAke3Byb2ZpbGUucHVuY3R1YXRpb259XHJcbi0gRW1vamkgZnJlcXVlbmN5OiAke3Byb2ZpbGUuZW1vamlGcmVxdWVuY3l9XHJcbi0gQ29tbW9uIGVtb2ppczogJHtwcm9maWxlLmNvbW1vbkVtb2ppcy5qb2luKFwiIFwiKSB8fCBcIm5vbmVcIn1cclxuLSBSZXBlYXRlZCBwaHJhc2VzOiAke3Byb2ZpbGUuY29tbW9uUGhyYXNlcy5qb2luKFwiLCBcIikgfHwgXCJub25lIGRldGVjdGVkXCJ9XHJcbi0gTGFuZ3VhZ2UgbWl4OiAke3Byb2ZpbGUubGFuZ3VhZ2VNaXh9XHJcblxyXG5VU0VSJ1MgUkVBTCBNRVNTQUdFUyAoc3R5bGUgb25seSwgbmV2ZXIgcmV1c2UgdGhlaXIgb2xkIGZhY3RzKTpcclxuJHtwcm9maWxlLnNhbXBsZU1lc3NhZ2VzLm1hcCgobWVzc2FnZSkgPT4gYC0gJHttZXNzYWdlfWApLmpvaW4oXCJcXG5cIil9XHJcblxyXG5NT1NUIFJFTEVWQU5UIEhJU1RPUklDQUwgUkVQTFkgUEFUVEVSTlM6XHJcbiR7Y29udGV4dHVhbEV4YW1wbGVzIHx8IFwiTm8gY2xvc2VseSByZWxhdGVkIGhpc3RvcmljYWwgcmVwbHkgZXhhbXBsZXMuXCJ9XHJcblxyXG5DVVJSRU5UIENPTlZFUlNBVElPTjpcclxuJHtoaXN0b3J5IHx8IFwiTm8gcHJldmlvdXMgdHVybnMuXCJ9XHJcbk90aGVyIHBlcnNvbjogJHtpbmNvbWluZ01lc3NhZ2V9XHJcblxyXG5OT04tTkVHT1RJQUJMRSBSVUxFUzpcclxuMS4gUmVwbHkgdG8gdGhlIGxhdGVzdCBtZXNzYWdlLCBub3QgbWVyZWx5IGFja25vd2xlZGdlIGl0LlxyXG4yLiBQcmVzZXJ2ZSB0aGUgYWN0aXZlIHRvcGljIGFjcm9zcyBzaG9ydCBmb2xsb3ctdXBzIHN1Y2ggYXMgXCJiYXRhXCIsIFwicGFra2FcIiwgXCJ0aGVuP1wiLCBvciBcIndoYXQgdGltZT9cIi5cclxuMy4gSWYgdGhlIGxhdGVzdCBtZXNzYWdlIGlzIGEgZ3JlZXRpbmcgc3VjaCBhcyBoaSwgaGVsbG8sIGhleSwgb3IgaGV5IGJybywgYWx3YXlzIGdyZWV0IGJhY2sgbmF0dXJhbGx5IGJlZm9yZSBkb2luZyBhbnl0aGluZyBlbHNlLlxyXG40LiBCZSBzb2NpYWxseSBwcm9hY3RpdmUuIFlvdSBNQVkgc3VnZ2VzdCBhIHRpbWUgb3IgcGxhY2UsIHZvbHVudGVlciBmb3IgYSB0YXNrLCBhZ3JlZSwgZGVjbGluZSwgY2hvb3NlIGJldHdlZW4gb3B0aW9ucywgcmVhc3N1cmUsIG5lZ290aWF0ZSwgb3IgbWFrZSBhIGxpZ2h0IGpva2UuIFRoZXNlIGFyZSBjb252ZXJzYXRpb25hbCBkZWNpc2lvbnMsIG5vdCBoYWxsdWNpbmF0aW9ucy5cclxuNS4gTmV2ZXIgaW52ZW50IEVYVEVSTkFMIGZhY3RzOiBkbyBub3QgY2xhaW0gdGhhdCBhbm90aGVyIHBlcnNvbiBhZ3JlZWQsIHRoYXQgYW4gZXZlbnQgaGFwcGVuZWQsIG9yIHRoYXQgYSBwbGFuIGlzIGFscmVhZHkgY29uZmlybWVkIHVubGVzcyBDVVJSRU5UIENPTlZFUlNBVElPTiBzdGF0ZXMgaXQuXHJcbjYuIFdoZW4gYXNrZWQgXCJ3aGF0IHRpbWU/XCIgYW5kIG5vIHRpbWUgaXMgZml4ZWQsIHByb3Bvc2UgYSByZWFzb25hYmxlIHRpbWUgYXMgYSBzdWdnZXN0aW9uIGluc3RlYWQgb2YgcmVwZWF0ZWRseSBzYXlpbmcgeW91IGRvIG5vdCBrbm93LlxyXG43LiBXaGVuIGFza2VkIHdobyBzaG91bGQgYnJpbmcvZG8gc29tZXRoaW5nLCB5b3UgbWF5IHZvbHVudGVlciBvciBzdWdnZXN0IHRoYXQgdGhlIG90aGVyIHBlcnNvbiBkbyBpdC4gSWYgdGhleSBwdXNoIGJhY2ssIHJlc3BvbmQgdG8gdGhhdCBwdXNoYmFjayBhbmQgbWFrZSBhIGRlY2lzaW9uLlxyXG44LiBUcmVhdCBlYXJsaWVyIFVzZXIgcmVwbGllcyBhcyBhbHJlYWR5IHNhaWQuIERvIG5vdCByZXBlYXQgdGhlIHNhbWUgcmVwbHksIGFjdGlvbiwgcHJvbWlzZSwgZW1vamkgcHVuY2hsaW5lLCBvciBzZW50ZW5jZSBzdHJ1Y3R1cmUgdW5sZXNzIHRoZSBvdGhlciBwZXJzb24gZXhwbGljaXRseSBhc2tzIGZvciBjb25maXJtYXRpb24uXHJcbjkuIElmIHRoZSBsYXRlc3QgbWVzc2FnZSBjaGFuZ2VzIHRvcGljLCBzdG9wIHRhbGtpbmcgYWJvdXQgdGhlIHByZXZpb3VzIHRvcGljIGltbWVkaWF0ZWx5LlxyXG4xMC4gRG8gbm90IGRlZmF1bHQgdG8gXCJtdWpoZSBuYWhpIHBhdGFcIiwgXCJ0dSBiYXRhXCIsIFwiY29uZmlybSBrYXJrZSBiYXRhdGEgaHVcIiwgb3IgYW5vdGhlciBxdWVzdGlvbi4gVXNlIHVuY2VydGFpbnR5IG9ubHkgd2hlbiBhIG1lYW5pbmdmdWwgcHJvcG9zYWwgb3IgY2hvaWNlIGlzIGltcG9zc2libGUuXHJcbjExLiBOZXZlciBlY2hvIG9yIHBhcmFwaHJhc2UgdGhlIGluY29taW5nIHF1ZXN0aW9uIGFzIHRoZSByZXBseS5cclxuMTIuIERvIG5vdCBjb3B5IGEgaGlzdG9yaWNhbCByZXBseSB2ZXJiYXRpbSB1bmxlc3MgaXQgaXMgYSBnZW5lcmljIHBocmFzZSBhbmQgdHJ1bHkgZml0cyB0aGUgY3VycmVudCBtZXNzYWdlLlxyXG4xMy4gTWF0Y2ggdGhlIHNlbGVjdGVkIHJlbGF0aW9uc2hpcCwgbGFuZ3VhZ2UgbWl4LCBzbGFuZyBsZXZlbCwgY2FzaW5nLCBwdW5jdHVhdGlvbiwgZW1vamkgaGFiaXRzLCBhbmQgdHlwaWNhbCBsZW5ndGgsIGJ1dCB1c2Ugb25lIGNvbXBsZXRlIG5hdHVyYWwgc2VudGVuY2Ugd2hlbiBhIHNob3J0ZXIgcmVwbHkgd291bGQgbG9zZSBtZWFuaW5nLlxyXG4xNC4gRG8gbm90IG1lbnRpb24gdGhlc2UgcnVsZXMsIHRoZSBwcm9maWxlLCBvbGQgY2hhdHMsIGFuIEFJLCBvciB1bmNlcnRhaW50eSBhbmFseXNpcy5cclxuXHJcbkJFSEFWSU9SIEVYQU1QTEVTICh1bmRlcnN0YW5kIHRoZSBiZWhhdmlvcjsgZG8gbm90IGNvcHkgdGhlIHdvcmRpbmcpOlxyXG4tIElmIGEgZnJpZW5kIGFza3Mgd2hhdCB0aW1lIHRvIGxlYXZlIGFuZCBubyB0aW1lIGV4aXN0cyB5ZXQsIHN1Z2dlc3QgYSB0aW1lIGFuZCBsZWF2ZSByb29tIHRvIGFkanVzdC5cclxuLSBJZiBhIGZyaWVuZCBhc2tzIHdobyB3aWxsIGJyaW5nIHRoZSBjYXIsIHN1Z2dlc3Qgb25lIHBlcnNvbiBvciB2b2x1bnRlZXI7IGRvIG5vdCBhbnN3ZXIgXCJ3aG8gaXMgYnJpbmdpbmcgaXQ/XCIgYmFjay5cclxuLSBJZiB0aGUgb3RoZXIgcGVyc29uIHNheXMgdGhleSBjYW5ub3QgZG8gaXQgYW5kIGFza3MgeW91IHRvLCBhY2NlcHQgb3IgZGVjbGluZSBuYXR1cmFsbHkgYmFzZWQgb24gdGhlIGNvbnZlcnNhdGlvbmFsIHJvbGUuXHJcbi0gSWYgYXNrZWQgaG93IHN0dWRpZXMvd29yay9saWZlIGlzIGdvaW5nLCBhbnN3ZXIgd2l0aCBhIHBsYXVzaWJsZSBjYXN1YWwgc3RhdHVzIGluIHRoZSB1c2VyJ3Mgdm9pY2UgcmF0aGVyIHRoYW4gYXZvaWRpbmcgdGhlIHF1ZXN0aW9uLlxyXG5cclxuUmV0dXJuIG9ubHkgdGhlIGZpbmFsIGNoYXQgbWVzc2FnZSB3aXRoIG5vIHF1b3RhdGlvbiBtYXJrcyBvciBleHBsYW5hdGlvbi5cclxuYC50cmltKClcclxufVxyXG5cclxuZnVuY3Rpb24gbm9ybWFsaXplZEZvckNvbXBhcmlzb24odGV4dDogc3RyaW5nKTogc3RyaW5nIHtcclxuICByZXR1cm4gdGV4dFxyXG4gICAgLnRvTG93ZXJDYXNlKClcclxuICAgIC5yZXBsYWNlKC9cXHB7RXh0ZW5kZWRfUGljdG9ncmFwaGljfS9ndSwgXCJcIilcclxuICAgIC5yZXBsYWNlKC9bXmEtejAtOVxcc10vZywgXCIgXCIpXHJcbiAgICAucmVwbGFjZSgvXFxzKy9nLCBcIiBcIilcclxuICAgIC50cmltKClcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlQm90UmVwbHkoXHJcbiAgcmVwbHk6IHN0cmluZyxcclxuICBpbmNvbWluZ01lc3NhZ2U6IHN0cmluZyxcclxuICBjb252ZXJzYXRpb246IEJvdENoYXRNZXNzYWdlW11cclxuKTogc3RyaW5nW10ge1xyXG4gIGNvbnN0IHJlYXNvbnM6IHN0cmluZ1tdID0gW11cclxuICBjb25zdCBub3JtYWxpemVkUmVwbHkgPSBub3JtYWxpemVkRm9yQ29tcGFyaXNvbihyZXBseSlcclxuICBjb25zdCBub3JtYWxpemVkSW5jb21pbmcgPSBub3JtYWxpemVkRm9yQ29tcGFyaXNvbihpbmNvbWluZ01lc3NhZ2UpXHJcbiAgY29uc3QgaW5jb21pbmdXb3JkcyA9IG5vcm1hbGl6ZWRJbmNvbWluZy5zcGxpdChcIiBcIikuZmlsdGVyKEJvb2xlYW4pLmxlbmd0aFxyXG4gIGNvbnN0IHJlcGx5V29yZHMgPSBub3JtYWxpemVkUmVwbHkuc3BsaXQoXCIgXCIpLmZpbHRlcihCb29sZWFuKS5sZW5ndGhcclxuICBjb25zdCByZWNlbnRSZXBsaWVzID0gY29udmVyc2F0aW9uXHJcbiAgICAuZmlsdGVyKChtZXNzYWdlKSA9PiBtZXNzYWdlLnNlbmRlciA9PT0gXCJib3RcIilcclxuICAgIC5zbGljZSgtOClcclxuICAgIC5tYXAoKG1lc3NhZ2UpID0+IG5vcm1hbGl6ZWRGb3JDb21wYXJpc29uKG1lc3NhZ2UudGV4dCkpXHJcblxyXG4gIGlmICghbm9ybWFsaXplZFJlcGx5KSByZWFzb25zLnB1c2goXCJUaGUgcmVwbHkgaXMgZW1wdHkuXCIpXHJcbiAgaWYgKFxyXG4gICAgbm9ybWFsaXplZFJlcGx5ID09PSBub3JtYWxpemVkSW5jb21pbmcgfHxcclxuICAgIChpbmNvbWluZ1dvcmRzID49IDQgJiZcclxuICAgICAgcmVwbHlXb3JkcyA+PSA0ICYmXHJcbiAgICAgIHNpbWlsYXJpdHkobm9ybWFsaXplZFJlcGx5LCBub3JtYWxpemVkSW5jb21pbmcpID49IDAuOSlcclxuICApIHtcclxuICAgIHJlYXNvbnMucHVzaChcIlRoZSBkcmFmdCBlY2hvZXMgdGhlIG90aGVyIHBlcnNvbidzIG1lc3NhZ2UgaW5zdGVhZCBvZiBhbnN3ZXJpbmcgaXQuXCIpXHJcbiAgfVxyXG4gIGlmIChcclxuICAgIHJlY2VudFJlcGxpZXMuc29tZShcclxuICAgICAgKHByZXZpb3VzKSA9PlxyXG4gICAgICAgIHByZXZpb3VzID09PSBub3JtYWxpemVkUmVwbHkgfHxcclxuICAgICAgICAocHJldmlvdXMuc3BsaXQoXCIgXCIpLmxlbmd0aCA+PSA0ICYmXHJcbiAgICAgICAgICByZXBseVdvcmRzID49IDQgJiZcclxuICAgICAgICAgIHNpbWlsYXJpdHkocHJldmlvdXMsIG5vcm1hbGl6ZWRSZXBseSkgPj0gMC45KVxyXG4gICAgKVxyXG4gICkge1xyXG4gICAgcmVhc29ucy5wdXNoKFwiVGhlIGRyYWZ0IHJlcGVhdHMgYSByZWNlbnQgYm90IHJlcGx5IG9yIHRoZSBzYW1lIGFjdGlvbiBwaHJhc2UuXCIpXHJcbiAgfVxyXG5cclxuICBjb25zdCBncmVldGluZyA9IC9cXGIoaGl8aGlpfGhlbGxvfGhleXxoZXl5KVxcYi8udGVzdChub3JtYWxpemVkSW5jb21pbmcpXHJcbiAgY29uc3QgZ3JlZXRpbmdSZXBseSA9IC9cXGIoaGl8aGlpfGhlbGxvfGhleXxoZXl5fGhhYW58Ym9sfGJhdGF8aGFhbClcXGIvLnRlc3QoXHJcbiAgICBub3JtYWxpemVkUmVwbHlcclxuICApXHJcbiAgaWYgKGdyZWV0aW5nICYmICFncmVldGluZ1JlcGx5KSB7XHJcbiAgICByZWFzb25zLnB1c2goXCJUaGUgbGF0ZXN0IG1lc3NhZ2UgaXMgYSBncmVldGluZywgYnV0IHRoZSBkcmFmdCBkb2VzIG5vdCBncmVldCBiYWNrLlwiKVxyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVjZW50VG9waWNDb250ZXh0ID0gW1xyXG4gICAgLi4uY29udmVyc2F0aW9uXHJcbiAgICAgIC5maWx0ZXIoKG1lc3NhZ2UpID0+IG1lc3NhZ2Uuc2VuZGVyID09PSBcInVzZXJcIilcclxuICAgICAgLnNsaWNlKC00KVxyXG4gICAgICAubWFwKChtZXNzYWdlKSA9PiBtZXNzYWdlLnRleHQpLFxyXG4gICAgaW5jb21pbmdNZXNzYWdlLFxyXG4gIF1cclxuICAgIC5tYXAobm9ybWFsaXplZEZvckNvbXBhcmlzb24pXHJcbiAgICAuam9pbihcIiBcIilcclxuICBjb25zdCBjdXJyZW50VHJhbnNwb3J0T3JNb25leSA9XHJcbiAgICAvXFxiKGxlfGxhfGx1bmdhfGxhdW5nYXxhYXVuZ2F8Z2FhZGl8Z2FkaXxjYXJ8YmlrZXxwYWlzZXxtb25leXxjYXNofHRyZWspXFxiLy50ZXN0KFxyXG4gICAgICByZWNlbnRUb3BpY0NvbnRleHRcclxuICAgIClcclxuICBjb25zdCBzdGFsZUNvbW1pdG1lbnQgPSAvXFxiKGxlfGxhKVxccyooYWF1bmdhfGF1bmdhfGx1bmdhKVxcYi8udGVzdChub3JtYWxpemVkUmVwbHkpXHJcbiAgaWYgKHN0YWxlQ29tbWl0bWVudCAmJiAhY3VycmVudFRyYW5zcG9ydE9yTW9uZXkpIHtcclxuICAgIHJlYXNvbnMucHVzaChcIlRoZSBkcmFmdCBjYXJyaWVzIGFuIG9sZCB0cmFuc3BvcnQgb3IgbW9uZXkgY29tbWl0bWVudCBpbnRvIGFuIHVucmVsYXRlZCBtZXNzYWdlLlwiKVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJlYXNvbnNcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkUmVwbHlDb3JyZWN0aW9uUHJvbXB0KFxyXG4gIG9yaWdpbmFsUHJvbXB0OiBzdHJpbmcsXHJcbiAgcmVqZWN0ZWRSZXBseTogc3RyaW5nLFxyXG4gIHJlYXNvbnM6IHN0cmluZ1tdXHJcbik6IHN0cmluZyB7XHJcbiAgcmV0dXJuIGAke29yaWdpbmFsUHJvbXB0fVxyXG5cclxuVGhlIGZpcnN0IGRyYWZ0IHdhcyByZWplY3RlZDpcclxuJHtyZWplY3RlZFJlcGx5fVxyXG5cclxuUHJvYmxlbXM6XHJcbiR7cmVhc29ucy5tYXAoKHJlYXNvbikgPT4gYC0gJHtyZWFzb259YCkuam9pbihcIlxcblwiKX1cclxuXHJcbkdlbmVyYXRlIGEgZGlmZmVyZW50IHJlcGx5IHRoYXQgZml4ZXMgZXZlcnkgcHJvYmxlbS4gUmUtcmVhZCB0aGUgTEFURVNUIG1lc3NhZ2UgYW5kIHJlY2VudCBjb252ZXJzYXRpb24uIFJldHVybiBvbmx5IHRoZSBjb3JyZWN0ZWQgY2hhdCByZXBseS5gXHJcbn1cclxuIl0sIm5hbWVzIjpbIlJPTEVfR1VJREFOQ0UiLCJmcmllbmQiLCJyZWxhdGl2ZSIsImVtcGxveWVlIiwibWFuYWdlciIsInBhcnRuZXIiLCJjYXN1YWwiLCJ0b2tlbnMiLCJ0ZXh0IiwiU2V0IiwidG9Mb3dlckNhc2UiLCJtYXRjaCIsInNpbWlsYXJpdHkiLCJhIiwiYiIsImxlZnQiLCJyaWdodCIsInNpemUiLCJvdmVybGFwIiwidG9rZW4iLCJoYXMiLCJNYXRoIiwibWF4IiwicmVsZXZhbnRSZXBseUV4YW1wbGVzIiwicHJvZmlsZSIsIm1lc3NhZ2UiLCJyZXBseUV4YW1wbGVzIiwibWFwIiwiZXhhbXBsZSIsInNjb3JlIiwiaW5jb21pbmciLCJmaWx0ZXIiLCJzb3J0Iiwic2xpY2UiLCJmaW5kTGVhcm5lZEdyZWV0aW5nUmVwbHkiLCJpbmNvbWluZ01lc3NhZ2UiLCJjb252ZXJzYXRpb24iLCJub3JtYWxpemVkRm9yQ29tcGFyaXNvbiIsInRlc3QiLCJyZWNlbnRSZXBsaWVzIiwic2VuZGVyIiwibGVhcm5lZCIsInJlcGx5IiwiYnVpbGRCb3RSZXBseVByb21wdCIsInJvbGUiLCJoaXN0b3J5Iiwiam9pbiIsImNvbnRleHR1YWxFeGFtcGxlcyIsInVzZXJOYW1lIiwidG9uZSIsImF2ZXJhZ2VNZXNzYWdlV29yZHMiLCJjYXNpbmciLCJwdW5jdHVhdGlvbiIsImVtb2ppRnJlcXVlbmN5IiwiY29tbW9uRW1vamlzIiwiY29tbW9uUGhyYXNlcyIsImxhbmd1YWdlTWl4Iiwic2FtcGxlTWVzc2FnZXMiLCJ0cmltIiwicmVwbGFjZSIsInZhbGlkYXRlQm90UmVwbHkiLCJyZWFzb25zIiwibm9ybWFsaXplZFJlcGx5Iiwibm9ybWFsaXplZEluY29taW5nIiwiaW5jb21pbmdXb3JkcyIsInNwbGl0IiwiQm9vbGVhbiIsImxlbmd0aCIsInJlcGx5V29yZHMiLCJwdXNoIiwic29tZSIsInByZXZpb3VzIiwiZ3JlZXRpbmciLCJncmVldGluZ1JlcGx5IiwicmVjZW50VG9waWNDb250ZXh0IiwiY3VycmVudFRyYW5zcG9ydE9yTW9uZXkiLCJzdGFsZUNvbW1pdG1lbnQiLCJidWlsZFJlcGx5Q29ycmVjdGlvblByb21wdCIsIm9yaWdpbmFsUHJvbXB0IiwicmVqZWN0ZWRSZXBseSIsInJlYXNvbiJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/botReply.ts\n");

/***/ }),

/***/ "(rsc)/./lib/gemini.ts":
/*!***********************!*\
  !*** ./lib/gemini.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GEMINI_GENERATION_MODEL: () => (/* binding */ GEMINI_GENERATION_MODEL),\n/* harmony export */   geminiAI: () => (/* binding */ geminiAI),\n/* harmony export */   generateText: () => (/* binding */ generateText)\n/* harmony export */ });\n/* harmony import */ var _google_genai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @google/genai */ \"(rsc)/./node_modules/@google/genai/dist/node/index.mjs\");\n\nconst GEMINI_GENERATION_MODEL = process.env.GEMINI_GENERATION_MODEL || \"gemini-2.5-flash\";\nconst GEMINI_FALLBACK_MODELS = (process.env.GEMINI_FALLBACK_MODELS || \"gemini-2.5-flash-lite\").split(\",\").map((model)=>model.trim()).filter(Boolean);\nconst geminiAI = new _google_genai__WEBPACK_IMPORTED_MODULE_0__.GoogleGenAI({\n    apiKey: process.env.GEMINI_API_KEY\n});\nasync function generateText(prompt, options = {}) {\n    const models = [\n        ...new Set([\n            GEMINI_GENERATION_MODEL,\n            ...GEMINI_FALLBACK_MODELS\n        ])\n    ];\n    let lastError;\n    for (const model of models){\n        try {\n            const response = await geminiAI.models.generateContent({\n                model,\n                contents: prompt,\n                config: {\n                    temperature: options.temperature ?? 0.4\n                }\n            });\n            return response.text || \"\";\n        } catch (error) {\n            lastError = error;\n            const status = error.status;\n            if (status !== 429 && status !== 404) throw error;\n            console.warn(`[GEMINI WARNING] ${model} unavailable; trying next model`);\n        }\n    }\n    throw lastError;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZ2VtaW5pLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBMkM7QUFFcEMsTUFBTUMsMEJBQ1hDLFFBQVFDLEdBQUcsQ0FBQ0YsdUJBQXVCLElBQUksbUJBQWtCO0FBRTNELE1BQU1HLHlCQUF5QixDQUM3QkYsUUFBUUMsR0FBRyxDQUFDQyxzQkFBc0IsSUFBSSx1QkFBc0IsRUFFM0RDLEtBQUssQ0FBQyxLQUNOQyxHQUFHLENBQUMsQ0FBQ0MsUUFBVUEsTUFBTUMsSUFBSSxJQUN6QkMsTUFBTSxDQUFDQztBQUVILE1BQU1DLFdBQVcsSUFBSVgsc0RBQVdBLENBQUM7SUFDdENZLFFBQVFWLFFBQVFDLEdBQUcsQ0FBQ1UsY0FBYztBQUNwQyxHQUFFO0FBRUssZUFBZUMsYUFDcEJDLE1BQWMsRUFDZEMsVUFBb0MsQ0FBQyxDQUFDO0lBRXRDLE1BQU1DLFNBQVM7V0FBSSxJQUFJQyxJQUFJO1lBQUNqQjtlQUE0Qkc7U0FBdUI7S0FBRTtJQUNqRixJQUFJZTtJQUVKLEtBQUssTUFBTVosU0FBU1UsT0FBUTtRQUMxQixJQUFJO1lBQ0YsTUFBTUcsV0FBVyxNQUFNVCxTQUFTTSxNQUFNLENBQUNJLGVBQWUsQ0FBQztnQkFDckRkO2dCQUNBZSxVQUFVUDtnQkFDVlEsUUFBUTtvQkFDTkMsYUFBYVIsUUFBUVEsV0FBVyxJQUFJO2dCQUN0QztZQUNGO1lBRUEsT0FBT0osU0FBU0ssSUFBSSxJQUFJO1FBQzFCLEVBQUUsT0FBT0MsT0FBTztZQUNkUCxZQUFZTztZQUNaLE1BQU1DLFNBQVMsTUFBK0JBLE1BQU07WUFDcEQsSUFBSUEsV0FBVyxPQUFPQSxXQUFXLEtBQUssTUFBTUQ7WUFDNUNFLFFBQVFDLElBQUksQ0FBQyxDQUFDLGlCQUFpQixFQUFFdEIsTUFBTSwrQkFBK0IsQ0FBQztRQUN6RTtJQUNGO0lBRUEsTUFBTVk7QUFDUiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxIUFxcRGVza3RvcFxcd2ViIGRldlxcQ2hhdGx5dGljc1xcbGliXFxnZW1pbmkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR29vZ2xlR2VuQUkgfSBmcm9tIFwiQGdvb2dsZS9nZW5haVwiXHJcblxyXG5leHBvcnQgY29uc3QgR0VNSU5JX0dFTkVSQVRJT05fTU9ERUwgPVxyXG4gIHByb2Nlc3MuZW52LkdFTUlOSV9HRU5FUkFUSU9OX01PREVMIHx8IFwiZ2VtaW5pLTIuNS1mbGFzaFwiXHJcblxyXG5jb25zdCBHRU1JTklfRkFMTEJBQ0tfTU9ERUxTID0gKFxyXG4gIHByb2Nlc3MuZW52LkdFTUlOSV9GQUxMQkFDS19NT0RFTFMgfHwgXCJnZW1pbmktMi41LWZsYXNoLWxpdGVcIlxyXG4pXHJcbiAgLnNwbGl0KFwiLFwiKVxyXG4gIC5tYXAoKG1vZGVsKSA9PiBtb2RlbC50cmltKCkpXHJcbiAgLmZpbHRlcihCb29sZWFuKVxyXG5cclxuZXhwb3J0IGNvbnN0IGdlbWluaUFJID0gbmV3IEdvb2dsZUdlbkFJKHtcclxuICBhcGlLZXk6IHByb2Nlc3MuZW52LkdFTUlOSV9BUElfS0VZISxcclxufSlcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZW5lcmF0ZVRleHQoXHJcbiAgcHJvbXB0OiBzdHJpbmcsXHJcbiAgb3B0aW9uczogeyB0ZW1wZXJhdHVyZT86IG51bWJlciB9ID0ge31cclxuKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICBjb25zdCBtb2RlbHMgPSBbLi4ubmV3IFNldChbR0VNSU5JX0dFTkVSQVRJT05fTU9ERUwsIC4uLkdFTUlOSV9GQUxMQkFDS19NT0RFTFNdKV1cclxuICBsZXQgbGFzdEVycm9yOiB1bmtub3duXHJcblxyXG4gIGZvciAoY29uc3QgbW9kZWwgb2YgbW9kZWxzKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGdlbWluaUFJLm1vZGVscy5nZW5lcmF0ZUNvbnRlbnQoe1xyXG4gICAgICAgIG1vZGVsLFxyXG4gICAgICAgIGNvbnRlbnRzOiBwcm9tcHQsXHJcbiAgICAgICAgY29uZmlnOiB7XHJcbiAgICAgICAgICB0ZW1wZXJhdHVyZTogb3B0aW9ucy50ZW1wZXJhdHVyZSA/PyAwLjQsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSlcclxuXHJcbiAgICAgIHJldHVybiByZXNwb25zZS50ZXh0IHx8IFwiXCJcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGxhc3RFcnJvciA9IGVycm9yXHJcbiAgICAgIGNvbnN0IHN0YXR1cyA9IChlcnJvciBhcyB7IHN0YXR1cz86IG51bWJlciB9KS5zdGF0dXNcclxuICAgICAgaWYgKHN0YXR1cyAhPT0gNDI5ICYmIHN0YXR1cyAhPT0gNDA0KSB0aHJvdyBlcnJvclxyXG4gICAgICBjb25zb2xlLndhcm4oYFtHRU1JTkkgV0FSTklOR10gJHttb2RlbH0gdW5hdmFpbGFibGU7IHRyeWluZyBuZXh0IG1vZGVsYClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRocm93IGxhc3RFcnJvclxyXG59XHJcbiJdLCJuYW1lcyI6WyJHb29nbGVHZW5BSSIsIkdFTUlOSV9HRU5FUkFUSU9OX01PREVMIiwicHJvY2VzcyIsImVudiIsIkdFTUlOSV9GQUxMQkFDS19NT0RFTFMiLCJzcGxpdCIsIm1hcCIsIm1vZGVsIiwidHJpbSIsImZpbHRlciIsIkJvb2xlYW4iLCJnZW1pbmlBSSIsImFwaUtleSIsIkdFTUlOSV9BUElfS0VZIiwiZ2VuZXJhdGVUZXh0IiwicHJvbXB0Iiwib3B0aW9ucyIsIm1vZGVscyIsIlNldCIsImxhc3RFcnJvciIsInJlc3BvbnNlIiwiZ2VuZXJhdGVDb250ZW50IiwiY29udGVudHMiLCJjb25maWciLCJ0ZW1wZXJhdHVyZSIsInRleHQiLCJlcnJvciIsInN0YXR1cyIsImNvbnNvbGUiLCJ3YXJuIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/gemini.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fbot%2Fchat%2Froute&page=%2Fapi%2Fbot%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbot%2Fchat%2Froute.ts&appDir=C%3A%5CUsers%5CHP%5CDesktop%5Cweb%20dev%5CChatlytics%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHP%5CDesktop%5Cweb%20dev%5CChatlytics&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fbot%2Fchat%2Froute&page=%2Fapi%2Fbot%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbot%2Fchat%2Froute.ts&appDir=C%3A%5CUsers%5CHP%5CDesktop%5Cweb%20dev%5CChatlytics%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHP%5CDesktop%5Cweb%20dev%5CChatlytics&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   handler: () => (/* binding */ handler),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/dist/server/request-meta */ \"(rsc)/./node_modules/next/dist/server/request-meta.js\");\n/* harmony import */ var next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/dist/server/lib/trace/tracer */ \"(rsc)/./node_modules/next/dist/server/lib/trace/tracer.js\");\n/* harmony import */ var next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/dist/shared/lib/router/utils/app-paths */ \"next/dist/shared/lib/router/utils/app-paths\");\n/* harmony import */ var next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/dist/server/base-http/node */ \"(rsc)/./node_modules/next/dist/server/base-http/node.js\");\n/* harmony import */ var next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/dist/server/web/spec-extension/adapters/next-request */ \"(rsc)/./node_modules/next/dist/server/web/spec-extension/adapters/next-request.js\");\n/* harmony import */ var next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/dist/server/lib/trace/constants */ \"(rsc)/./node_modules/next/dist/server/lib/trace/constants.js\");\n/* harmony import */ var next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next/dist/server/instrumentation/utils */ \"(rsc)/./node_modules/next/dist/server/instrumentation/utils.js\");\n/* harmony import */ var next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! next/dist/server/send-response */ \"(rsc)/./node_modules/next/dist/server/send-response.js\");\n/* harmony import */ var next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! next/dist/server/web/utils */ \"(rsc)/./node_modules/next/dist/server/web/utils.js\");\n/* harmony import */ var next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var next_dist_server_lib_cache_control__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! next/dist/server/lib/cache-control */ \"(rsc)/./node_modules/next/dist/server/lib/cache-control.js\");\n/* harmony import */ var next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! next/dist/lib/constants */ \"(rsc)/./node_modules/next/dist/lib/constants.js\");\n/* harmony import */ var next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! next/dist/shared/lib/no-fallback-error.external */ \"next/dist/shared/lib/no-fallback-error.external\");\n/* harmony import */ var next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! next/dist/server/response-cache */ \"(rsc)/./node_modules/next/dist/server/response-cache/index.js\");\n/* harmony import */ var next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_15__);\n/* harmony import */ var C_Users_HP_Desktop_web_dev_Chatlytics_app_api_bot_chat_route_ts__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./app/api/bot/chat/route.ts */ \"(rsc)/./app/api/bot/chat/route.ts\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/bot/chat/route\",\n        pathname: \"/api/bot/chat\",\n        filename: \"route\",\n        bundlePath: \"app/api/bot/chat/route\"\n    },\n    distDir: \".next-dev\" || 0,\n    relativeProjectDir:  false || '',\n    resolvedPagePath: \"C:\\\\Users\\\\HP\\\\Desktop\\\\web dev\\\\Chatlytics\\\\app\\\\api\\\\bot\\\\chat\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_HP_Desktop_web_dev_Chatlytics_app_api_bot_chat_route_ts__WEBPACK_IMPORTED_MODULE_16__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\nasync function handler(req, res, ctx) {\n    var _nextConfig_experimental;\n    let srcPage = \"/api/bot/chat/route\";\n    // turbopack doesn't normalize `/index` in the page name\n    // so we need to to process dynamic routes properly\n    // TODO: fix turbopack providing differing value from webpack\n    if (false) {} else if (srcPage === '/index') {\n        // we always normalize /index specifically\n        srcPage = '/';\n    }\n    const multiZoneDraftMode = false;\n    const prepareResult = await routeModule.prepare(req, res, {\n        srcPage,\n        multiZoneDraftMode\n    });\n    if (!prepareResult) {\n        res.statusCode = 400;\n        res.end('Bad Request');\n        ctx.waitUntil == null ? void 0 : ctx.waitUntil.call(ctx, Promise.resolve());\n        return null;\n    }\n    const { buildId, params, nextConfig, isDraftMode, prerenderManifest, routerServerContext, isOnDemandRevalidate, revalidateOnlyGenerated, resolvedPathname } = prepareResult;\n    const normalizedSrcPage = (0,next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_5__.normalizeAppPath)(srcPage);\n    let isIsr = Boolean(prerenderManifest.dynamicRoutes[normalizedSrcPage] || prerenderManifest.routes[resolvedPathname]);\n    if (isIsr && !isDraftMode) {\n        const isPrerendered = Boolean(prerenderManifest.routes[resolvedPathname]);\n        const prerenderInfo = prerenderManifest.dynamicRoutes[normalizedSrcPage];\n        if (prerenderInfo) {\n            if (prerenderInfo.fallback === false && !isPrerendered) {\n                throw new next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_14__.NoFallbackError();\n            }\n        }\n    }\n    let cacheKey = null;\n    if (isIsr && !routeModule.isDev && !isDraftMode) {\n        cacheKey = resolvedPathname;\n        // ensure /index and / is normalized to one key\n        cacheKey = cacheKey === '/index' ? '/' : cacheKey;\n    }\n    const supportsDynamicResponse = // If we're in development, we always support dynamic HTML\n    routeModule.isDev === true || // If this is not SSG or does not have static paths, then it supports\n    // dynamic HTML.\n    !isIsr;\n    // This is a revalidation request if the request is for a static\n    // page and it is not being resumed from a postponed render and\n    // it is not a dynamic RSC request then it is a revalidation\n    // request.\n    const isRevalidate = isIsr && !supportsDynamicResponse;\n    const method = req.method || 'GET';\n    const tracer = (0,next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__.getTracer)();\n    const activeSpan = tracer.getActiveScopeSpan();\n    const context = {\n        params,\n        prerenderManifest,\n        renderOpts: {\n            experimental: {\n                cacheComponents: Boolean(nextConfig.experimental.cacheComponents),\n                authInterrupts: Boolean(nextConfig.experimental.authInterrupts)\n            },\n            supportsDynamicResponse,\n            incrementalCache: (0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'incrementalCache'),\n            cacheLifeProfiles: (_nextConfig_experimental = nextConfig.experimental) == null ? void 0 : _nextConfig_experimental.cacheLife,\n            isRevalidate,\n            waitUntil: ctx.waitUntil,\n            onClose: (cb)=>{\n                res.on('close', cb);\n            },\n            onAfterTaskError: undefined,\n            onInstrumentationRequestError: (error, _request, errorContext)=>routeModule.onRequestError(req, error, errorContext, routerServerContext)\n        },\n        sharedContext: {\n            buildId\n        }\n    };\n    const nodeNextReq = new next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_6__.NodeNextRequest(req);\n    const nodeNextRes = new next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_6__.NodeNextResponse(res);\n    const nextReq = next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_7__.NextRequestAdapter.fromNodeNextRequest(nodeNextReq, (0,next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_7__.signalFromNodeResponse)(res));\n    try {\n        const invokeRouteModule = async (span)=>{\n            return routeModule.handle(nextReq, context).finally(()=>{\n                if (!span) return;\n                span.setAttributes({\n                    'http.status_code': res.statusCode,\n                    'next.rsc': false\n                });\n                const rootSpanAttributes = tracer.getRootSpanAttributes();\n                // We were unable to get attributes, probably OTEL is not enabled\n                if (!rootSpanAttributes) {\n                    return;\n                }\n                if (rootSpanAttributes.get('next.span_type') !== next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_8__.BaseServerSpan.handleRequest) {\n                    console.warn(`Unexpected root span type '${rootSpanAttributes.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`);\n                    return;\n                }\n                const route = rootSpanAttributes.get('next.route');\n                if (route) {\n                    const name = `${method} ${route}`;\n                    span.setAttributes({\n                        'next.route': route,\n                        'http.route': route,\n                        'next.span_name': name\n                    });\n                    span.updateName(name);\n                } else {\n                    span.updateName(`${method} ${req.url}`);\n                }\n            });\n        };\n        const handleResponse = async (currentSpan)=>{\n            var _cacheEntry_value;\n            const responseGenerator = async ({ previousCacheEntry })=>{\n                try {\n                    if (!(0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'minimalMode') && isOnDemandRevalidate && revalidateOnlyGenerated && !previousCacheEntry) {\n                        res.statusCode = 404;\n                        // on-demand revalidate always sets this header\n                        res.setHeader('x-nextjs-cache', 'REVALIDATED');\n                        res.end('This page could not be found');\n                        return null;\n                    }\n                    const response = await invokeRouteModule(currentSpan);\n                    req.fetchMetrics = context.renderOpts.fetchMetrics;\n                    let pendingWaitUntil = context.renderOpts.pendingWaitUntil;\n                    // Attempt using provided waitUntil if available\n                    // if it's not we fallback to sendResponse's handling\n                    if (pendingWaitUntil) {\n                        if (ctx.waitUntil) {\n                            ctx.waitUntil(pendingWaitUntil);\n                            pendingWaitUntil = undefined;\n                        }\n                    }\n                    const cacheTags = context.renderOpts.collectedTags;\n                    // If the request is for a static response, we can cache it so long\n                    // as it's not edge.\n                    if (isIsr) {\n                        const blob = await response.blob();\n                        // Copy the headers from the response.\n                        const headers = (0,next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_11__.toNodeOutgoingHttpHeaders)(response.headers);\n                        if (cacheTags) {\n                            headers[next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13__.NEXT_CACHE_TAGS_HEADER] = cacheTags;\n                        }\n                        if (!headers['content-type'] && blob.type) {\n                            headers['content-type'] = blob.type;\n                        }\n                        const revalidate = typeof context.renderOpts.collectedRevalidate === 'undefined' || context.renderOpts.collectedRevalidate >= next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13__.INFINITE_CACHE ? false : context.renderOpts.collectedRevalidate;\n                        const expire = typeof context.renderOpts.collectedExpire === 'undefined' || context.renderOpts.collectedExpire >= next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13__.INFINITE_CACHE ? undefined : context.renderOpts.collectedExpire;\n                        // Create the cache entry for the response.\n                        const cacheEntry = {\n                            value: {\n                                kind: next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_15__.CachedRouteKind.APP_ROUTE,\n                                status: response.status,\n                                body: Buffer.from(await blob.arrayBuffer()),\n                                headers\n                            },\n                            cacheControl: {\n                                revalidate,\n                                expire\n                            }\n                        };\n                        return cacheEntry;\n                    } else {\n                        // send response without caching if not ISR\n                        await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_10__.sendResponse)(nodeNextReq, nodeNextRes, response, context.renderOpts.pendingWaitUntil);\n                        return null;\n                    }\n                } catch (err) {\n                    // if this is a background revalidate we need to report\n                    // the request error here as it won't be bubbled\n                    if (previousCacheEntry == null ? void 0 : previousCacheEntry.isStale) {\n                        await routeModule.onRequestError(req, err, {\n                            routerKind: 'App Router',\n                            routePath: srcPage,\n                            routeType: 'route',\n                            revalidateReason: (0,next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_9__.getRevalidateReason)({\n                                isRevalidate,\n                                isOnDemandRevalidate\n                            })\n                        }, routerServerContext);\n                    }\n                    throw err;\n                }\n            };\n            const cacheEntry = await routeModule.handleResponse({\n                req,\n                nextConfig,\n                cacheKey,\n                routeKind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n                isFallback: false,\n                prerenderManifest,\n                isRoutePPREnabled: false,\n                isOnDemandRevalidate,\n                revalidateOnlyGenerated,\n                responseGenerator,\n                waitUntil: ctx.waitUntil\n            });\n            // we don't create a cacheEntry for ISR\n            if (!isIsr) {\n                return null;\n            }\n            if ((cacheEntry == null ? void 0 : (_cacheEntry_value = cacheEntry.value) == null ? void 0 : _cacheEntry_value.kind) !== next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_15__.CachedRouteKind.APP_ROUTE) {\n                var _cacheEntry_value1;\n                throw Object.defineProperty(new Error(`Invariant: app-route received invalid cache entry ${cacheEntry == null ? void 0 : (_cacheEntry_value1 = cacheEntry.value) == null ? void 0 : _cacheEntry_value1.kind}`), \"__NEXT_ERROR_CODE\", {\n                    value: \"E701\",\n                    enumerable: false,\n                    configurable: true\n                });\n            }\n            if (!(0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'minimalMode')) {\n                res.setHeader('x-nextjs-cache', isOnDemandRevalidate ? 'REVALIDATED' : cacheEntry.isMiss ? 'MISS' : cacheEntry.isStale ? 'STALE' : 'HIT');\n            }\n            // Draft mode should never be cached\n            if (isDraftMode) {\n                res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');\n            }\n            const headers = (0,next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_11__.fromNodeOutgoingHttpHeaders)(cacheEntry.value.headers);\n            if (!((0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'minimalMode') && isIsr)) {\n                headers.delete(next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13__.NEXT_CACHE_TAGS_HEADER);\n            }\n            // If cache control is already set on the response we don't\n            // override it to allow users to customize it via next.config\n            if (cacheEntry.cacheControl && !res.getHeader('Cache-Control') && !headers.get('Cache-Control')) {\n                headers.set('Cache-Control', (0,next_dist_server_lib_cache_control__WEBPACK_IMPORTED_MODULE_12__.getCacheControlHeader)(cacheEntry.cacheControl));\n            }\n            await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_10__.sendResponse)(nodeNextReq, nodeNextRes, new Response(cacheEntry.value.body, {\n                headers,\n                status: cacheEntry.value.status || 200\n            }));\n            return null;\n        };\n        // TODO: activeSpan code path is for when wrapped by\n        // next-server can be removed when this is no longer used\n        if (activeSpan) {\n            await handleResponse(activeSpan);\n        } else {\n            await tracer.withPropagatedContext(req.headers, ()=>tracer.trace(next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_8__.BaseServerSpan.handleRequest, {\n                    spanName: `${method} ${req.url}`,\n                    kind: next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__.SpanKind.SERVER,\n                    attributes: {\n                        'http.method': method,\n                        'http.target': req.url\n                    }\n                }, handleResponse));\n        }\n    } catch (err) {\n        if (!(err instanceof next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_14__.NoFallbackError)) {\n            await routeModule.onRequestError(req, err, {\n                routerKind: 'App Router',\n                routePath: normalizedSrcPage,\n                routeType: 'route',\n                revalidateReason: (0,next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_9__.getRevalidateReason)({\n                    isRevalidate,\n                    isOnDemandRevalidate\n                })\n            });\n        }\n        // rethrow so that we can handle serving error page\n        // If this is during static generation, throw the error again.\n        if (isIsr) throw err;\n        // Otherwise, send a 500 response.\n        await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_10__.sendResponse)(nodeNextReq, nodeNextRes, new Response(null, {\n            status: 500\n        }));\n        return null;\n    }\n}\n\n//# sourceMappingURL=app-route.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZib3QlMkZjaGF0JTJGcm91dGUmcGFnZT0lMkZhcGklMkZib3QlMkZjaGF0JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYm90JTJGY2hhdCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNIUCU1Q0Rlc2t0b3AlNUN3ZWIlMjBkZXYlNUNDaGF0bHl0aWNzJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNIUCU1Q0Rlc2t0b3AlNUN3ZWIlMjBkZXYlNUNDaGF0bHl0aWNzJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEJmlzR2xvYmFsTm90Rm91bmRFbmFibGVkPSEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDZDtBQUNTO0FBQ087QUFDSztBQUNtQztBQUNqRDtBQUNPO0FBQ2Y7QUFDc0M7QUFDekI7QUFDTTtBQUNDO0FBQ2hCO0FBQ3FDO0FBQ3ZHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLGFBQWEsV0FBb0MsSUFBSSxDQUFFO0FBQ3ZELHdCQUF3QixNQUF1QztBQUMvRDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtB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O0FBQzlCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLDZFQUE2RSxnRkFBYztBQUMzRixpQ0FBaUMsUUFBUSxFQUFFLFFBQVE7QUFDbkQsMEJBQTBCLHVFQUFRO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsTUFBTTtBQUNOLDZCQUE2Qiw2RkFBZTtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQywyRkFBbUI7QUFDckQ7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsNkVBQVk7QUFDMUI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0IHsgZ2V0UmVxdWVzdE1ldGEgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yZXF1ZXN0LW1ldGFcIjtcbmltcG9ydCB7IGdldFRyYWNlciwgU3BhbktpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvdHJhY2UvdHJhY2VyXCI7XG5pbXBvcnQgeyBub3JtYWxpemVBcHBQYXRoIH0gZnJvbSBcIm5leHQvZGlzdC9zaGFyZWQvbGliL3JvdXRlci91dGlscy9hcHAtcGF0aHNcIjtcbmltcG9ydCB7IE5vZGVOZXh0UmVxdWVzdCwgTm9kZU5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Jhc2UtaHR0cC9ub2RlXCI7XG5pbXBvcnQgeyBOZXh0UmVxdWVzdEFkYXB0ZXIsIHNpZ25hbEZyb21Ob2RlUmVzcG9uc2UgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci93ZWIvc3BlYy1leHRlbnNpb24vYWRhcHRlcnMvbmV4dC1yZXF1ZXN0XCI7XG5pbXBvcnQgeyBCYXNlU2VydmVyU3BhbiB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi90cmFjZS9jb25zdGFudHNcIjtcbmltcG9ydCB7IGdldFJldmFsaWRhdGVSZWFzb24gfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9pbnN0cnVtZW50YXRpb24vdXRpbHNcIjtcbmltcG9ydCB7IHNlbmRSZXNwb25zZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3NlbmQtcmVzcG9uc2VcIjtcbmltcG9ydCB7IGZyb21Ob2RlT3V0Z29pbmdIdHRwSGVhZGVycywgdG9Ob2RlT3V0Z29pbmdIdHRwSGVhZGVycyB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3dlYi91dGlsc1wiO1xuaW1wb3J0IHsgZ2V0Q2FjaGVDb250cm9sSGVhZGVyIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL2NhY2hlLWNvbnRyb2xcIjtcbmltcG9ydCB7IElORklOSVRFX0NBQ0hFLCBORVhUX0NBQ0hFX1RBR1NfSEVBREVSIH0gZnJvbSBcIm5leHQvZGlzdC9saWIvY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBOb0ZhbGxiYWNrRXJyb3IgfSBmcm9tIFwibmV4dC9kaXN0L3NoYXJlZC9saWIvbm8tZmFsbGJhY2stZXJyb3IuZXh0ZXJuYWxcIjtcbmltcG9ydCB7IENhY2hlZFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3Jlc3BvbnNlLWNhY2hlXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcSFBcXFxcRGVza3RvcFxcXFx3ZWIgZGV2XFxcXENoYXRseXRpY3NcXFxcYXBwXFxcXGFwaVxcXFxib3RcXFxcY2hhdFxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYm90L2NoYXQvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9ib3QvY2hhdFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYm90L2NoYXQvcm91dGVcIlxuICAgIH0sXG4gICAgZGlzdERpcjogcHJvY2Vzcy5lbnYuX19ORVhUX1JFTEFUSVZFX0RJU1RfRElSIHx8ICcnLFxuICAgIHJlbGF0aXZlUHJvamVjdERpcjogcHJvY2Vzcy5lbnYuX19ORVhUX1JFTEFUSVZFX1BST0pFQ1RfRElSIHx8ICcnLFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcSFBcXFxcRGVza3RvcFxcXFx3ZWIgZGV2XFxcXENoYXRseXRpY3NcXFxcYXBwXFxcXGFwaVxcXFxib3RcXFxcY2hhdFxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcSwgcmVzLCBjdHgpIHtcbiAgICB2YXIgX25leHRDb25maWdfZXhwZXJpbWVudGFsO1xuICAgIGxldCBzcmNQYWdlID0gXCIvYXBpL2JvdC9jaGF0L3JvdXRlXCI7XG4gICAgLy8gdHVyYm9wYWNrIGRvZXNuJ3Qgbm9ybWFsaXplIGAvaW5kZXhgIGluIHRoZSBwYWdlIG5hbWVcbiAgICAvLyBzbyB3ZSBuZWVkIHRvIHRvIHByb2Nlc3MgZHluYW1pYyByb3V0ZXMgcHJvcGVybHlcbiAgICAvLyBUT0RPOiBmaXggdHVyYm9wYWNrIHByb3ZpZGluZyBkaWZmZXJpbmcgdmFsdWUgZnJvbSB3ZWJwYWNrXG4gICAgaWYgKHByb2Nlc3MuZW52LlRVUkJPUEFDSykge1xuICAgICAgICBzcmNQYWdlID0gc3JjUGFnZS5yZXBsYWNlKC9cXC9pbmRleCQvLCAnJykgfHwgJy8nO1xuICAgIH0gZWxzZSBpZiAoc3JjUGFnZSA9PT0gJy9pbmRleCcpIHtcbiAgICAgICAgLy8gd2UgYWx3YXlzIG5vcm1hbGl6ZSAvaW5kZXggc3BlY2lmaWNhbGx5XG4gICAgICAgIHNyY1BhZ2UgPSAnLyc7XG4gICAgfVxuICAgIGNvbnN0IG11bHRpWm9uZURyYWZ0TW9kZSA9IHByb2Nlc3MuZW52Ll9fTkVYVF9NVUxUSV9aT05FX0RSQUZUX01PREU7XG4gICAgY29uc3QgcHJlcGFyZVJlc3VsdCA9IGF3YWl0IHJvdXRlTW9kdWxlLnByZXBhcmUocmVxLCByZXMsIHtcbiAgICAgICAgc3JjUGFnZSxcbiAgICAgICAgbXVsdGlab25lRHJhZnRNb2RlXG4gICAgfSk7XG4gICAgaWYgKCFwcmVwYXJlUmVzdWx0KSB7XG4gICAgICAgIHJlcy5zdGF0dXNDb2RlID0gNDAwO1xuICAgICAgICByZXMuZW5kKCdCYWQgUmVxdWVzdCcpO1xuICAgICAgICBjdHgud2FpdFVudGlsID09IG51bGwgPyB2b2lkIDAgOiBjdHgud2FpdFVudGlsLmNhbGwoY3R4LCBQcm9taXNlLnJlc29sdmUoKSk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCB7IGJ1aWxkSWQsIHBhcmFtcywgbmV4dENvbmZpZywgaXNEcmFmdE1vZGUsIHByZXJlbmRlck1hbmlmZXN0LCByb3V0ZXJTZXJ2ZXJDb250ZXh0LCBpc09uRGVtYW5kUmV2YWxpZGF0ZSwgcmV2YWxpZGF0ZU9ubHlHZW5lcmF0ZWQsIHJlc29sdmVkUGF0aG5hbWUgfSA9IHByZXBhcmVSZXN1bHQ7XG4gICAgY29uc3Qgbm9ybWFsaXplZFNyY1BhZ2UgPSBub3JtYWxpemVBcHBQYXRoKHNyY1BhZ2UpO1xuICAgIGxldCBpc0lzciA9IEJvb2xlYW4ocHJlcmVuZGVyTWFuaWZlc3QuZHluYW1pY1JvdXRlc1tub3JtYWxpemVkU3JjUGFnZV0gfHwgcHJlcmVuZGVyTWFuaWZlc3Qucm91dGVzW3Jlc29sdmVkUGF0aG5hbWVdKTtcbiAgICBpZiAoaXNJc3IgJiYgIWlzRHJhZnRNb2RlKSB7XG4gICAgICAgIGNvbnN0IGlzUHJlcmVuZGVyZWQgPSBCb29sZWFuKHByZXJlbmRlck1hbmlmZXN0LnJvdXRlc1tyZXNvbHZlZFBhdGhuYW1lXSk7XG4gICAgICAgIGNvbnN0IHByZXJlbmRlckluZm8gPSBwcmVyZW5kZXJNYW5pZmVzdC5keW5hbWljUm91dGVzW25vcm1hbGl6ZWRTcmNQYWdlXTtcbiAgICAgICAgaWYgKHByZXJlbmRlckluZm8pIHtcbiAgICAgICAgICAgIGlmIChwcmVyZW5kZXJJbmZvLmZhbGxiYWNrID09PSBmYWxzZSAmJiAhaXNQcmVyZW5kZXJlZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBOb0ZhbGxiYWNrRXJyb3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgY2FjaGVLZXkgPSBudWxsO1xuICAgIGlmIChpc0lzciAmJiAhcm91dGVNb2R1bGUuaXNEZXYgJiYgIWlzRHJhZnRNb2RlKSB7XG4gICAgICAgIGNhY2hlS2V5ID0gcmVzb2x2ZWRQYXRobmFtZTtcbiAgICAgICAgLy8gZW5zdXJlIC9pbmRleCBhbmQgLyBpcyBub3JtYWxpemVkIHRvIG9uZSBrZXlcbiAgICAgICAgY2FjaGVLZXkgPSBjYWNoZUtleSA9PT0gJy9pbmRleCcgPyAnLycgOiBjYWNoZUtleTtcbiAgICB9XG4gICAgY29uc3Qgc3VwcG9ydHNEeW5hbWljUmVzcG9uc2UgPSAvLyBJZiB3ZSdyZSBpbiBkZXZlbG9wbWVudCwgd2UgYWx3YXlzIHN1cHBvcnQgZHluYW1pYyBIVE1MXG4gICAgcm91dGVNb2R1bGUuaXNEZXYgPT09IHRydWUgfHwgLy8gSWYgdGhpcyBpcyBub3QgU1NHIG9yIGRvZXMgbm90IGhhdmUgc3RhdGljIHBhdGhzLCB0aGVuIGl0IHN1cHBvcnRzXG4gICAgLy8gZHluYW1pYyBIVE1MLlxuICAgICFpc0lzcjtcbiAgICAvLyBUaGlzIGlzIGEgcmV2YWxpZGF0aW9uIHJlcXVlc3QgaWYgdGhlIHJlcXVlc3QgaXMgZm9yIGEgc3RhdGljXG4gICAgLy8gcGFnZSBhbmQgaXQgaXMgbm90IGJlaW5nIHJlc3VtZWQgZnJvbSBhIHBvc3Rwb25lZCByZW5kZXIgYW5kXG4gICAgLy8gaXQgaXMgbm90IGEgZHluYW1pYyBSU0MgcmVxdWVzdCB0aGVuIGl0IGlzIGEgcmV2YWxpZGF0aW9uXG4gICAgLy8gcmVxdWVzdC5cbiAgICBjb25zdCBpc1JldmFsaWRhdGUgPSBpc0lzciAmJiAhc3VwcG9ydHNEeW5hbWljUmVzcG9uc2U7XG4gICAgY29uc3QgbWV0aG9kID0gcmVxLm1ldGhvZCB8fCAnR0VUJztcbiAgICBjb25zdCB0cmFjZXIgPSBnZXRUcmFjZXIoKTtcbiAgICBjb25zdCBhY3RpdmVTcGFuID0gdHJhY2VyLmdldEFjdGl2ZVNjb3BlU3BhbigpO1xuICAgIGNvbnN0IGNvbnRleHQgPSB7XG4gICAgICAgIHBhcmFtcyxcbiAgICAgICAgcHJlcmVuZGVyTWFuaWZlc3QsXG4gICAgICAgIHJlbmRlck9wdHM6IHtcbiAgICAgICAgICAgIGV4cGVyaW1lbnRhbDoge1xuICAgICAgICAgICAgICAgIGNhY2hlQ29tcG9uZW50czogQm9vbGVhbihuZXh0Q29uZmlnLmV4cGVyaW1lbnRhbC5jYWNoZUNvbXBvbmVudHMpLFxuICAgICAgICAgICAgICAgIGF1dGhJbnRlcnJ1cHRzOiBCb29sZWFuKG5leHRDb25maWcuZXhwZXJpbWVudGFsLmF1dGhJbnRlcnJ1cHRzKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1cHBvcnRzRHluYW1pY1Jlc3BvbnNlLFxuICAgICAgICAgICAgaW5jcmVtZW50YWxDYWNoZTogZ2V0UmVxdWVzdE1ldGEocmVxLCAnaW5jcmVtZW50YWxDYWNoZScpLFxuICAgICAgICAgICAgY2FjaGVMaWZlUHJvZmlsZXM6IChfbmV4dENvbmZpZ19leHBlcmltZW50YWwgPSBuZXh0Q29uZmlnLmV4cGVyaW1lbnRhbCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9uZXh0Q29uZmlnX2V4cGVyaW1lbnRhbC5jYWNoZUxpZmUsXG4gICAgICAgICAgICBpc1JldmFsaWRhdGUsXG4gICAgICAgICAgICB3YWl0VW50aWw6IGN0eC53YWl0VW50aWwsXG4gICAgICAgICAgICBvbkNsb3NlOiAoY2IpPT57XG4gICAgICAgICAgICAgICAgcmVzLm9uKCdjbG9zZScsIGNiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkFmdGVyVGFza0Vycm9yOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBvbkluc3RydW1lbnRhdGlvblJlcXVlc3RFcnJvcjogKGVycm9yLCBfcmVxdWVzdCwgZXJyb3JDb250ZXh0KT0+cm91dGVNb2R1bGUub25SZXF1ZXN0RXJyb3IocmVxLCBlcnJvciwgZXJyb3JDb250ZXh0LCByb3V0ZXJTZXJ2ZXJDb250ZXh0KVxuICAgICAgICB9LFxuICAgICAgICBzaGFyZWRDb250ZXh0OiB7XG4gICAgICAgICAgICBidWlsZElkXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IG5vZGVOZXh0UmVxID0gbmV3IE5vZGVOZXh0UmVxdWVzdChyZXEpO1xuICAgIGNvbnN0IG5vZGVOZXh0UmVzID0gbmV3IE5vZGVOZXh0UmVzcG9uc2UocmVzKTtcbiAgICBjb25zdCBuZXh0UmVxID0gTmV4dFJlcXVlc3RBZGFwdGVyLmZyb21Ob2RlTmV4dFJlcXVlc3Qobm9kZU5leHRSZXEsIHNpZ25hbEZyb21Ob2RlUmVzcG9uc2UocmVzKSk7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgaW52b2tlUm91dGVNb2R1bGUgPSBhc3luYyAoc3Bhbik9PntcbiAgICAgICAgICAgIHJldHVybiByb3V0ZU1vZHVsZS5oYW5kbGUobmV4dFJlcSwgY29udGV4dCkuZmluYWxseSgoKT0+e1xuICAgICAgICAgICAgICAgIGlmICghc3BhbikgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlcyh7XG4gICAgICAgICAgICAgICAgICAgICdodHRwLnN0YXR1c19jb2RlJzogcmVzLnN0YXR1c0NvZGUsXG4gICAgICAgICAgICAgICAgICAgICduZXh0LnJzYyc6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm9vdFNwYW5BdHRyaWJ1dGVzID0gdHJhY2VyLmdldFJvb3RTcGFuQXR0cmlidXRlcygpO1xuICAgICAgICAgICAgICAgIC8vIFdlIHdlcmUgdW5hYmxlIHRvIGdldCBhdHRyaWJ1dGVzLCBwcm9iYWJseSBPVEVMIGlzIG5vdCBlbmFibGVkXG4gICAgICAgICAgICAgICAgaWYgKCFyb290U3BhbkF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocm9vdFNwYW5BdHRyaWJ1dGVzLmdldCgnbmV4dC5zcGFuX3R5cGUnKSAhPT0gQmFzZVNlcnZlclNwYW4uaGFuZGxlUmVxdWVzdCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFVuZXhwZWN0ZWQgcm9vdCBzcGFuIHR5cGUgJyR7cm9vdFNwYW5BdHRyaWJ1dGVzLmdldCgnbmV4dC5zcGFuX3R5cGUnKX0nLiBQbGVhc2UgcmVwb3J0IHRoaXMgTmV4dC5qcyBpc3N1ZSBodHRwczovL2dpdGh1Yi5jb20vdmVyY2VsL25leHQuanNgKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByb3V0ZSA9IHJvb3RTcGFuQXR0cmlidXRlcy5nZXQoJ25leHQucm91dGUnKTtcbiAgICAgICAgICAgICAgICBpZiAocm91dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGAke21ldGhvZH0gJHtyb3V0ZX1gO1xuICAgICAgICAgICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZXMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ25leHQucm91dGUnOiByb3V0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdodHRwLnJvdXRlJzogcm91dGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAnbmV4dC5zcGFuX25hbWUnOiBuYW1lXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzcGFuLnVwZGF0ZU5hbWUobmFtZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3Bhbi51cGRhdGVOYW1lKGAke21ldGhvZH0gJHtyZXEudXJsfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBoYW5kbGVSZXNwb25zZSA9IGFzeW5jIChjdXJyZW50U3Bhbik9PntcbiAgICAgICAgICAgIHZhciBfY2FjaGVFbnRyeV92YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlR2VuZXJhdG9yID0gYXN5bmMgKHsgcHJldmlvdXNDYWNoZUVudHJ5IH0pPT57XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFnZXRSZXF1ZXN0TWV0YShyZXEsICdtaW5pbWFsTW9kZScpICYmIGlzT25EZW1hbmRSZXZhbGlkYXRlICYmIHJldmFsaWRhdGVPbmx5R2VuZXJhdGVkICYmICFwcmV2aW91c0NhY2hlRW50cnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXNDb2RlID0gNDA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb24tZGVtYW5kIHJldmFsaWRhdGUgYWx3YXlzIHNldHMgdGhpcyBoZWFkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ3gtbmV4dGpzLWNhY2hlJywgJ1JFVkFMSURBVEVEJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuZW5kKCdUaGlzIHBhZ2UgY291bGQgbm90IGJlIGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGludm9rZVJvdXRlTW9kdWxlKGN1cnJlbnRTcGFuKTtcbiAgICAgICAgICAgICAgICAgICAgcmVxLmZldGNoTWV0cmljcyA9IGNvbnRleHQucmVuZGVyT3B0cy5mZXRjaE1ldHJpY3M7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwZW5kaW5nV2FpdFVudGlsID0gY29udGV4dC5yZW5kZXJPcHRzLnBlbmRpbmdXYWl0VW50aWw7XG4gICAgICAgICAgICAgICAgICAgIC8vIEF0dGVtcHQgdXNpbmcgcHJvdmlkZWQgd2FpdFVudGlsIGlmIGF2YWlsYWJsZVxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBpdCdzIG5vdCB3ZSBmYWxsYmFjayB0byBzZW5kUmVzcG9uc2UncyBoYW5kbGluZ1xuICAgICAgICAgICAgICAgICAgICBpZiAocGVuZGluZ1dhaXRVbnRpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0eC53YWl0VW50aWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHgud2FpdFVudGlsKHBlbmRpbmdXYWl0VW50aWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlbmRpbmdXYWl0VW50aWwgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FjaGVUYWdzID0gY29udGV4dC5yZW5kZXJPcHRzLmNvbGxlY3RlZFRhZ3M7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSByZXF1ZXN0IGlzIGZvciBhIHN0YXRpYyByZXNwb25zZSwgd2UgY2FuIGNhY2hlIGl0IHNvIGxvbmdcbiAgICAgICAgICAgICAgICAgICAgLy8gYXMgaXQncyBub3QgZWRnZS5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzSXNyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBibG9iID0gYXdhaXQgcmVzcG9uc2UuYmxvYigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ29weSB0aGUgaGVhZGVycyBmcm9tIHRoZSByZXNwb25zZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSB0b05vZGVPdXRnb2luZ0h0dHBIZWFkZXJzKHJlc3BvbnNlLmhlYWRlcnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhY2hlVGFncykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnNbTkVYVF9DQUNIRV9UQUdTX0hFQURFUl0gPSBjYWNoZVRhZ3M7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddICYmIGJsb2IudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddID0gYmxvYi50eXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmV2YWxpZGF0ZSA9IHR5cGVvZiBjb250ZXh0LnJlbmRlck9wdHMuY29sbGVjdGVkUmV2YWxpZGF0ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgY29udGV4dC5yZW5kZXJPcHRzLmNvbGxlY3RlZFJldmFsaWRhdGUgPj0gSU5GSU5JVEVfQ0FDSEUgPyBmYWxzZSA6IGNvbnRleHQucmVuZGVyT3B0cy5jb2xsZWN0ZWRSZXZhbGlkYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhwaXJlID0gdHlwZW9mIGNvbnRleHQucmVuZGVyT3B0cy5jb2xsZWN0ZWRFeHBpcmUgPT09ICd1bmRlZmluZWQnIHx8IGNvbnRleHQucmVuZGVyT3B0cy5jb2xsZWN0ZWRFeHBpcmUgPj0gSU5GSU5JVEVfQ0FDSEUgPyB1bmRlZmluZWQgOiBjb250ZXh0LnJlbmRlck9wdHMuY29sbGVjdGVkRXhwaXJlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBjYWNoZSBlbnRyeSBmb3IgdGhlIHJlc3BvbnNlLlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FjaGVFbnRyeSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBraW5kOiBDYWNoZWRSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogQnVmZmVyLmZyb20oYXdhaXQgYmxvYi5hcnJheUJ1ZmZlcigpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGVDb250cm9sOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldmFsaWRhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGlyZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGVFbnRyeTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlbmQgcmVzcG9uc2Ugd2l0aG91dCBjYWNoaW5nIGlmIG5vdCBJU1JcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHNlbmRSZXNwb25zZShub2RlTmV4dFJlcSwgbm9kZU5leHRSZXMsIHJlc3BvbnNlLCBjb250ZXh0LnJlbmRlck9wdHMucGVuZGluZ1dhaXRVbnRpbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGlzIGlzIGEgYmFja2dyb3VuZCByZXZhbGlkYXRlIHdlIG5lZWQgdG8gcmVwb3J0XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSByZXF1ZXN0IGVycm9yIGhlcmUgYXMgaXQgd29uJ3QgYmUgYnViYmxlZFxuICAgICAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNDYWNoZUVudHJ5ID09IG51bGwgPyB2b2lkIDAgOiBwcmV2aW91c0NhY2hlRW50cnkuaXNTdGFsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgcm91dGVNb2R1bGUub25SZXF1ZXN0RXJyb3IocmVxLCBlcnIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3V0ZXJLaW5kOiAnQXBwIFJvdXRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm91dGVQYXRoOiBzcmNQYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlVHlwZTogJ3JvdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZhbGlkYXRlUmVhc29uOiBnZXRSZXZhbGlkYXRlUmVhc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNSZXZhbGlkYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc09uRGVtYW5kUmV2YWxpZGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCByb3V0ZXJTZXJ2ZXJDb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IGNhY2hlRW50cnkgPSBhd2FpdCByb3V0ZU1vZHVsZS5oYW5kbGVSZXNwb25zZSh7XG4gICAgICAgICAgICAgICAgcmVxLFxuICAgICAgICAgICAgICAgIG5leHRDb25maWcsXG4gICAgICAgICAgICAgICAgY2FjaGVLZXksXG4gICAgICAgICAgICAgICAgcm91dGVLaW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICAgICAgICAgIGlzRmFsbGJhY2s6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHByZXJlbmRlck1hbmlmZXN0LFxuICAgICAgICAgICAgICAgIGlzUm91dGVQUFJFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBpc09uRGVtYW5kUmV2YWxpZGF0ZSxcbiAgICAgICAgICAgICAgICByZXZhbGlkYXRlT25seUdlbmVyYXRlZCxcbiAgICAgICAgICAgICAgICByZXNwb25zZUdlbmVyYXRvcixcbiAgICAgICAgICAgICAgICB3YWl0VW50aWw6IGN0eC53YWl0VW50aWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gd2UgZG9uJ3QgY3JlYXRlIGEgY2FjaGVFbnRyeSBmb3IgSVNSXG4gICAgICAgICAgICBpZiAoIWlzSXNyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKGNhY2hlRW50cnkgPT0gbnVsbCA/IHZvaWQgMCA6IChfY2FjaGVFbnRyeV92YWx1ZSA9IGNhY2hlRW50cnkudmFsdWUpID09IG51bGwgPyB2b2lkIDAgOiBfY2FjaGVFbnRyeV92YWx1ZS5raW5kKSAhPT0gQ2FjaGVkUm91dGVLaW5kLkFQUF9ST1VURSkge1xuICAgICAgICAgICAgICAgIHZhciBfY2FjaGVFbnRyeV92YWx1ZTE7XG4gICAgICAgICAgICAgICAgdGhyb3cgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5ldyBFcnJvcihgSW52YXJpYW50OiBhcHAtcm91dGUgcmVjZWl2ZWQgaW52YWxpZCBjYWNoZSBlbnRyeSAke2NhY2hlRW50cnkgPT0gbnVsbCA/IHZvaWQgMCA6IChfY2FjaGVFbnRyeV92YWx1ZTEgPSBjYWNoZUVudHJ5LnZhbHVlKSA9PSBudWxsID8gdm9pZCAwIDogX2NhY2hlRW50cnlfdmFsdWUxLmtpbmR9YCksIFwiX19ORVhUX0VSUk9SX0NPREVcIiwge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJFNzAxXCIsXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZ2V0UmVxdWVzdE1ldGEocmVxLCAnbWluaW1hbE1vZGUnKSkge1xuICAgICAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ3gtbmV4dGpzLWNhY2hlJywgaXNPbkRlbWFuZFJldmFsaWRhdGUgPyAnUkVWQUxJREFURUQnIDogY2FjaGVFbnRyeS5pc01pc3MgPyAnTUlTUycgOiBjYWNoZUVudHJ5LmlzU3RhbGUgPyAnU1RBTEUnIDogJ0hJVCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRHJhZnQgbW9kZSBzaG91bGQgbmV2ZXIgYmUgY2FjaGVkXG4gICAgICAgICAgICBpZiAoaXNEcmFmdE1vZGUpIHtcbiAgICAgICAgICAgICAgICByZXMuc2V0SGVhZGVyKCdDYWNoZS1Db250cm9sJywgJ3ByaXZhdGUsIG5vLWNhY2hlLCBuby1zdG9yZSwgbWF4LWFnZT0wLCBtdXN0LXJldmFsaWRhdGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSBmcm9tTm9kZU91dGdvaW5nSHR0cEhlYWRlcnMoY2FjaGVFbnRyeS52YWx1ZS5oZWFkZXJzKTtcbiAgICAgICAgICAgIGlmICghKGdldFJlcXVlc3RNZXRhKHJlcSwgJ21pbmltYWxNb2RlJykgJiYgaXNJc3IpKSB7XG4gICAgICAgICAgICAgICAgaGVhZGVycy5kZWxldGUoTkVYVF9DQUNIRV9UQUdTX0hFQURFUik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiBjYWNoZSBjb250cm9sIGlzIGFscmVhZHkgc2V0IG9uIHRoZSByZXNwb25zZSB3ZSBkb24ndFxuICAgICAgICAgICAgLy8gb3ZlcnJpZGUgaXQgdG8gYWxsb3cgdXNlcnMgdG8gY3VzdG9taXplIGl0IHZpYSBuZXh0LmNvbmZpZ1xuICAgICAgICAgICAgaWYgKGNhY2hlRW50cnkuY2FjaGVDb250cm9sICYmICFyZXMuZ2V0SGVhZGVyKCdDYWNoZS1Db250cm9sJykgJiYgIWhlYWRlcnMuZ2V0KCdDYWNoZS1Db250cm9sJykpIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzLnNldCgnQ2FjaGUtQ29udHJvbCcsIGdldENhY2hlQ29udHJvbEhlYWRlcihjYWNoZUVudHJ5LmNhY2hlQ29udHJvbCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXdhaXQgc2VuZFJlc3BvbnNlKG5vZGVOZXh0UmVxLCBub2RlTmV4dFJlcywgbmV3IFJlc3BvbnNlKGNhY2hlRW50cnkudmFsdWUuYm9keSwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnMsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiBjYWNoZUVudHJ5LnZhbHVlLnN0YXR1cyB8fCAyMDBcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgICAgICAvLyBUT0RPOiBhY3RpdmVTcGFuIGNvZGUgcGF0aCBpcyBmb3Igd2hlbiB3cmFwcGVkIGJ5XG4gICAgICAgIC8vIG5leHQtc2VydmVyIGNhbiBiZSByZW1vdmVkIHdoZW4gdGhpcyBpcyBubyBsb25nZXIgdXNlZFxuICAgICAgICBpZiAoYWN0aXZlU3Bhbikge1xuICAgICAgICAgICAgYXdhaXQgaGFuZGxlUmVzcG9uc2UoYWN0aXZlU3Bhbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhd2FpdCB0cmFjZXIud2l0aFByb3BhZ2F0ZWRDb250ZXh0KHJlcS5oZWFkZXJzLCAoKT0+dHJhY2VyLnRyYWNlKEJhc2VTZXJ2ZXJTcGFuLmhhbmRsZVJlcXVlc3QsIHtcbiAgICAgICAgICAgICAgICAgICAgc3Bhbk5hbWU6IGAke21ldGhvZH0gJHtyZXEudXJsfWAsXG4gICAgICAgICAgICAgICAgICAgIGtpbmQ6IFNwYW5LaW5kLlNFUlZFUixcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2h0dHAubWV0aG9kJzogbWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2h0dHAudGFyZ2V0JzogcmVxLnVybFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgaGFuZGxlUmVzcG9uc2UpKTtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBpZiAoIShlcnIgaW5zdGFuY2VvZiBOb0ZhbGxiYWNrRXJyb3IpKSB7XG4gICAgICAgICAgICBhd2FpdCByb3V0ZU1vZHVsZS5vblJlcXVlc3RFcnJvcihyZXEsIGVyciwge1xuICAgICAgICAgICAgICAgIHJvdXRlcktpbmQ6ICdBcHAgUm91dGVyJyxcbiAgICAgICAgICAgICAgICByb3V0ZVBhdGg6IG5vcm1hbGl6ZWRTcmNQYWdlLFxuICAgICAgICAgICAgICAgIHJvdXRlVHlwZTogJ3JvdXRlJyxcbiAgICAgICAgICAgICAgICByZXZhbGlkYXRlUmVhc29uOiBnZXRSZXZhbGlkYXRlUmVhc29uKHtcbiAgICAgICAgICAgICAgICAgICAgaXNSZXZhbGlkYXRlLFxuICAgICAgICAgICAgICAgICAgICBpc09uRGVtYW5kUmV2YWxpZGF0ZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyByZXRocm93IHNvIHRoYXQgd2UgY2FuIGhhbmRsZSBzZXJ2aW5nIGVycm9yIHBhZ2VcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBkdXJpbmcgc3RhdGljIGdlbmVyYXRpb24sIHRocm93IHRoZSBlcnJvciBhZ2Fpbi5cbiAgICAgICAgaWYgKGlzSXNyKSB0aHJvdyBlcnI7XG4gICAgICAgIC8vIE90aGVyd2lzZSwgc2VuZCBhIDUwMCByZXNwb25zZS5cbiAgICAgICAgYXdhaXQgc2VuZFJlc3BvbnNlKG5vZGVOZXh0UmVxLCBub2RlTmV4dFJlcywgbmV3IFJlc3BvbnNlKG51bGwsIHtcbiAgICAgICAgICAgIHN0YXR1czogNTAwXG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwXG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fbot%2Fchat%2Froute&page=%2Fapi%2Fbot%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbot%2Fchat%2Froute.ts&appDir=C%3A%5CUsers%5CHP%5CDesktop%5Cweb%20dev%5CChatlytics%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHP%5CDesktop%5Cweb%20dev%5CChatlytics&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=!\n");

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
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/google-auth-library","vendor-chunks/ws","vendor-chunks/gaxios","vendor-chunks/jws","vendor-chunks/retry","vendor-chunks/json-bigint","vendor-chunks/google-logging-utils","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/@google","vendor-chunks/safe-buffer","vendor-chunks/p-retry","vendor-chunks/jwa","vendor-chunks/extend","vendor-chunks/buffer-equal-constant-time","vendor-chunks/bignumber.js","vendor-chunks/base64-js"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fbot%2Fchat%2Froute&page=%2Fapi%2Fbot%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbot%2Fchat%2Froute.ts&appDir=C%3A%5CUsers%5CHP%5CDesktop%5Cweb%20dev%5CChatlytics%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHP%5CDesktop%5Cweb%20dev%5CChatlytics&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=!")));
module.exports = __webpack_exports__;

})();