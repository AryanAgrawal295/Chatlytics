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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_gemini__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/gemini */ \"(rsc)/./lib/gemini.ts\");\n/* harmony import */ var _lib_botReply__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/botReply */ \"(rsc)/./lib/botReply.ts\");\n\n\n\nconst ROLES = [\n    \"friend\",\n    \"relative\",\n    \"employee\",\n    \"manager\",\n    \"partner\",\n    \"casual\"\n];\nasync function POST(req) {\n    try {\n        const { role, profile, conversation, message } = await req.json();\n        if (!ROLES.includes(role) || !profile || typeof message !== \"string\" || !message.trim()) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Role, style profile, and message are required\"\n            }, {\n                status: 400\n            });\n        }\n        const recentConversation = Array.isArray(conversation) ? conversation.slice(-16) : [];\n        const learnedGreeting = (0,_lib_botReply__WEBPACK_IMPORTED_MODULE_2__.findLearnedGreetingReply)(profile, message, recentConversation);\n        if (learnedGreeting) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                reply: learnedGreeting,\n                source: \"learned_example\"\n            });\n        }\n        const prompt = (0,_lib_botReply__WEBPACK_IMPORTED_MODULE_2__.buildBotReplyPrompt)(role, profile, recentConversation, message.slice(0, 2000));\n        let reply = (await (0,_lib_gemini__WEBPACK_IMPORTED_MODULE_1__.generateText)(prompt, {\n            temperature: 0.65\n        })).trim();\n        if (!reply) throw new Error(\"Gemini returned an empty reply\");\n        const validationProblems = (0,_lib_botReply__WEBPACK_IMPORTED_MODULE_2__.validateBotReply)(reply, message, recentConversation);\n        if (validationProblems.length > 0) {\n            try {\n                const correctionPrompt = (0,_lib_botReply__WEBPACK_IMPORTED_MODULE_2__.buildReplyCorrectionPrompt)(prompt, reply, validationProblems);\n                const correctedReply = (await (0,_lib_gemini__WEBPACK_IMPORTED_MODULE_1__.generateText)(correctionPrompt, {\n                    temperature: 0.75\n                })).trim();\n                const correctionProblems = (0,_lib_botReply__WEBPACK_IMPORTED_MODULE_2__.validateBotReply)(correctedReply, message, recentConversation);\n                if (correctedReply && correctionProblems.length <= validationProblems.length) {\n                    reply = correctedReply;\n                }\n            } catch (correctionError) {\n                console.warn(\"[BOT CHAT WARNING] Correction unavailable; returning first generated reply\", correctionError);\n            }\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            reply\n        });\n    } catch (error) {\n        console.error(\"[BOT CHAT ERROR]\", error);\n        const status = error.status;\n        const message = status === 429 ? \"Gemini quota is exhausted. Dynamic replies need an available model; please retry after the quota resets or use a billed API key.\" : status === 403 ? \"Gemini access is denied for this API project. Use an API key from a project with Gemini API access.\" : \"The AI model could not generate a reply. Please retry.\";\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: message\n        }, {\n            status: 503\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2JvdC9jaGF0L3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBdUQ7QUFDWjtBQU1wQjtBQUd2QixNQUFNTSxRQUFtQjtJQUN2QjtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7Q0FDRDtBQUVNLGVBQWVDLEtBQUtDLEdBQWdCO0lBQ3pDLElBQUk7UUFDRixNQUFNLEVBQUVDLElBQUksRUFBRUMsT0FBTyxFQUFFQyxZQUFZLEVBQUVDLE9BQU8sRUFBRSxHQUFJLE1BQU1KLElBQUlLLElBQUk7UUFPaEUsSUFBSSxDQUFDUCxNQUFNUSxRQUFRLENBQUNMLFNBQVMsQ0FBQ0MsV0FBVyxPQUFPRSxZQUFZLFlBQVksQ0FBQ0EsUUFBUUcsSUFBSSxJQUFJO1lBQ3ZGLE9BQU9mLHFEQUFZQSxDQUFDYSxJQUFJLENBQUM7Z0JBQUVHLE9BQU87WUFBZ0QsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3JHO1FBRUEsTUFBTUMscUJBQXFCQyxNQUFNQyxPQUFPLENBQUNULGdCQUNyQ0EsYUFBYVUsS0FBSyxDQUFDLENBQUMsTUFDcEIsRUFBRTtRQUNOLE1BQU1DLGtCQUFrQmxCLHVFQUF3QkEsQ0FDOUNNLFNBQ0FFLFNBQ0FNO1FBRUYsSUFBSUksaUJBQWlCO1lBQ25CLE9BQU90QixxREFBWUEsQ0FBQ2EsSUFBSSxDQUFDO2dCQUFFVSxPQUFPRDtnQkFBaUJFLFFBQVE7WUFBa0I7UUFDL0U7UUFFQSxNQUFNQyxTQUFTdkIsa0VBQW1CQSxDQUNoQ08sTUFDQUMsU0FDQVEsb0JBQ0FOLFFBQVFTLEtBQUssQ0FBQyxHQUFHO1FBRW5CLElBQUlFLFFBQVEsQ0FBQyxNQUFNdEIseURBQVlBLENBQUN3QixRQUFRO1lBQUVDLGFBQWE7UUFBSyxFQUFDLEVBQUdYLElBQUk7UUFDcEUsSUFBSSxDQUFDUSxPQUFPLE1BQU0sSUFBSUksTUFBTTtRQUU1QixNQUFNQyxxQkFBcUJ2QiwrREFBZ0JBLENBQ3pDa0IsT0FDQVgsU0FDQU07UUFFRixJQUFJVSxtQkFBbUJDLE1BQU0sR0FBRyxHQUFHO1lBQ2pDLElBQUk7Z0JBQ0YsTUFBTUMsbUJBQW1CM0IseUVBQTBCQSxDQUNqRHNCLFFBQ0FGLE9BQ0FLO2dCQUVGLE1BQU1HLGlCQUFpQixDQUNyQixNQUFNOUIseURBQVlBLENBQUM2QixrQkFBa0I7b0JBQUVKLGFBQWE7Z0JBQUssRUFBQyxFQUMxRFgsSUFBSTtnQkFDTixNQUFNaUIscUJBQXFCM0IsK0RBQWdCQSxDQUN6QzBCLGdCQUNBbkIsU0FDQU07Z0JBR0YsSUFDRWEsa0JBQ0FDLG1CQUFtQkgsTUFBTSxJQUFJRCxtQkFBbUJDLE1BQU0sRUFDdEQ7b0JBQ0FOLFFBQVFRO2dCQUNWO1lBQ0YsRUFBRSxPQUFPRSxpQkFBaUI7Z0JBQ3hCQyxRQUFRQyxJQUFJLENBQ1YsOEVBQ0FGO1lBRUo7UUFDRjtRQUVBLE9BQU9qQyxxREFBWUEsQ0FBQ2EsSUFBSSxDQUFDO1lBQUVVO1FBQU07SUFDbkMsRUFBRSxPQUFPUCxPQUFPO1FBQ2RrQixRQUFRbEIsS0FBSyxDQUFDLG9CQUFvQkE7UUFDbEMsTUFBTUMsU0FBUyxNQUErQkEsTUFBTTtRQUNwRCxNQUFNTCxVQUNKSyxXQUFXLE1BQ1AscUlBQ0FBLFdBQVcsTUFDVCx3R0FDQTtRQUNSLE9BQU9qQixxREFBWUEsQ0FBQ2EsSUFBSSxDQUFDO1lBQUVHLE9BQU9KO1FBQVEsR0FBRztZQUFFSyxRQUFRO1FBQUk7SUFDN0Q7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL2FyeWFuYWdyYXdhbC9EZXNrdG9wL1Byb2plY3RzL2NoYXRseXRpY3MtRklOQUwvYXBwL2FwaS9ib3QvY2hhdC9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCJcbmltcG9ydCB7IGdlbmVyYXRlVGV4dCB9IGZyb20gXCJAL2xpYi9nZW1pbmlcIlxuaW1wb3J0IHtcbiAgYnVpbGRCb3RSZXBseVByb21wdCxcbiAgYnVpbGRSZXBseUNvcnJlY3Rpb25Qcm9tcHQsXG4gIGZpbmRMZWFybmVkR3JlZXRpbmdSZXBseSxcbiAgdmFsaWRhdGVCb3RSZXBseSxcbn0gZnJvbSBcIkAvbGliL2JvdFJlcGx5XCJcbmltcG9ydCB7IEJvdENoYXRNZXNzYWdlLCBCb3RSb2xlLCBTdHlsZVByb2ZpbGUgfSBmcm9tIFwiQC90eXBlcy9ib3RcIlxuXG5jb25zdCBST0xFUzogQm90Um9sZVtdID0gW1xuICBcImZyaWVuZFwiLFxuICBcInJlbGF0aXZlXCIsXG4gIFwiZW1wbG95ZWVcIixcbiAgXCJtYW5hZ2VyXCIsXG4gIFwicGFydG5lclwiLFxuICBcImNhc3VhbFwiLFxuXVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyByb2xlLCBwcm9maWxlLCBjb252ZXJzYXRpb24sIG1lc3NhZ2UgfSA9IChhd2FpdCByZXEuanNvbigpKSBhcyB7XG4gICAgICByb2xlOiBCb3RSb2xlXG4gICAgICBwcm9maWxlOiBTdHlsZVByb2ZpbGVcbiAgICAgIGNvbnZlcnNhdGlvbjogQm90Q2hhdE1lc3NhZ2VbXVxuICAgICAgbWVzc2FnZTogc3RyaW5nXG4gICAgfVxuXG4gICAgaWYgKCFST0xFUy5pbmNsdWRlcyhyb2xlKSB8fCAhcHJvZmlsZSB8fCB0eXBlb2YgbWVzc2FnZSAhPT0gXCJzdHJpbmdcIiB8fCAhbWVzc2FnZS50cmltKCkpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlJvbGUsIHN0eWxlIHByb2ZpbGUsIGFuZCBtZXNzYWdlIGFyZSByZXF1aXJlZFwiIH0sIHsgc3RhdHVzOiA0MDAgfSlcbiAgICB9XG5cbiAgICBjb25zdCByZWNlbnRDb252ZXJzYXRpb24gPSBBcnJheS5pc0FycmF5KGNvbnZlcnNhdGlvbilcbiAgICAgID8gY29udmVyc2F0aW9uLnNsaWNlKC0xNilcbiAgICAgIDogW11cbiAgICBjb25zdCBsZWFybmVkR3JlZXRpbmcgPSBmaW5kTGVhcm5lZEdyZWV0aW5nUmVwbHkoXG4gICAgICBwcm9maWxlLFxuICAgICAgbWVzc2FnZSxcbiAgICAgIHJlY2VudENvbnZlcnNhdGlvblxuICAgIClcbiAgICBpZiAobGVhcm5lZEdyZWV0aW5nKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyByZXBseTogbGVhcm5lZEdyZWV0aW5nLCBzb3VyY2U6IFwibGVhcm5lZF9leGFtcGxlXCIgfSlcbiAgICB9XG5cbiAgICBjb25zdCBwcm9tcHQgPSBidWlsZEJvdFJlcGx5UHJvbXB0KFxuICAgICAgcm9sZSxcbiAgICAgIHByb2ZpbGUsXG4gICAgICByZWNlbnRDb252ZXJzYXRpb24sXG4gICAgICBtZXNzYWdlLnNsaWNlKDAsIDJfMDAwKVxuICAgIClcbiAgICBsZXQgcmVwbHkgPSAoYXdhaXQgZ2VuZXJhdGVUZXh0KHByb21wdCwgeyB0ZW1wZXJhdHVyZTogMC42NSB9KSkudHJpbSgpXG4gICAgaWYgKCFyZXBseSkgdGhyb3cgbmV3IEVycm9yKFwiR2VtaW5pIHJldHVybmVkIGFuIGVtcHR5IHJlcGx5XCIpXG5cbiAgICBjb25zdCB2YWxpZGF0aW9uUHJvYmxlbXMgPSB2YWxpZGF0ZUJvdFJlcGx5KFxuICAgICAgcmVwbHksXG4gICAgICBtZXNzYWdlLFxuICAgICAgcmVjZW50Q29udmVyc2F0aW9uXG4gICAgKVxuICAgIGlmICh2YWxpZGF0aW9uUHJvYmxlbXMubGVuZ3RoID4gMCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY29ycmVjdGlvblByb21wdCA9IGJ1aWxkUmVwbHlDb3JyZWN0aW9uUHJvbXB0KFxuICAgICAgICAgIHByb21wdCxcbiAgICAgICAgICByZXBseSxcbiAgICAgICAgICB2YWxpZGF0aW9uUHJvYmxlbXNcbiAgICAgICAgKVxuICAgICAgICBjb25zdCBjb3JyZWN0ZWRSZXBseSA9IChcbiAgICAgICAgICBhd2FpdCBnZW5lcmF0ZVRleHQoY29ycmVjdGlvblByb21wdCwgeyB0ZW1wZXJhdHVyZTogMC43NSB9KVxuICAgICAgICApLnRyaW0oKVxuICAgICAgICBjb25zdCBjb3JyZWN0aW9uUHJvYmxlbXMgPSB2YWxpZGF0ZUJvdFJlcGx5KFxuICAgICAgICAgIGNvcnJlY3RlZFJlcGx5LFxuICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgcmVjZW50Q29udmVyc2F0aW9uXG4gICAgICAgIClcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgY29ycmVjdGVkUmVwbHkgJiZcbiAgICAgICAgICBjb3JyZWN0aW9uUHJvYmxlbXMubGVuZ3RoIDw9IHZhbGlkYXRpb25Qcm9ibGVtcy5sZW5ndGhcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmVwbHkgPSBjb3JyZWN0ZWRSZXBseVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChjb3JyZWN0aW9uRXJyb3IpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIFwiW0JPVCBDSEFUIFdBUk5JTkddIENvcnJlY3Rpb24gdW5hdmFpbGFibGU7IHJldHVybmluZyBmaXJzdCBnZW5lcmF0ZWQgcmVwbHlcIixcbiAgICAgICAgICBjb3JyZWN0aW9uRXJyb3JcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHJlcGx5IH0pXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIltCT1QgQ0hBVCBFUlJPUl1cIiwgZXJyb3IpXG4gICAgY29uc3Qgc3RhdHVzID0gKGVycm9yIGFzIHsgc3RhdHVzPzogbnVtYmVyIH0pLnN0YXR1c1xuICAgIGNvbnN0IG1lc3NhZ2UgPVxuICAgICAgc3RhdHVzID09PSA0MjlcbiAgICAgICAgPyBcIkdlbWluaSBxdW90YSBpcyBleGhhdXN0ZWQuIER5bmFtaWMgcmVwbGllcyBuZWVkIGFuIGF2YWlsYWJsZSBtb2RlbDsgcGxlYXNlIHJldHJ5IGFmdGVyIHRoZSBxdW90YSByZXNldHMgb3IgdXNlIGEgYmlsbGVkIEFQSSBrZXkuXCJcbiAgICAgICAgOiBzdGF0dXMgPT09IDQwM1xuICAgICAgICAgID8gXCJHZW1pbmkgYWNjZXNzIGlzIGRlbmllZCBmb3IgdGhpcyBBUEkgcHJvamVjdC4gVXNlIGFuIEFQSSBrZXkgZnJvbSBhIHByb2plY3Qgd2l0aCBHZW1pbmkgQVBJIGFjY2Vzcy5cIlxuICAgICAgICAgIDogXCJUaGUgQUkgbW9kZWwgY291bGQgbm90IGdlbmVyYXRlIGEgcmVwbHkuIFBsZWFzZSByZXRyeS5cIlxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBtZXNzYWdlIH0sIHsgc3RhdHVzOiA1MDMgfSlcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImdlbmVyYXRlVGV4dCIsImJ1aWxkQm90UmVwbHlQcm9tcHQiLCJidWlsZFJlcGx5Q29ycmVjdGlvblByb21wdCIsImZpbmRMZWFybmVkR3JlZXRpbmdSZXBseSIsInZhbGlkYXRlQm90UmVwbHkiLCJST0xFUyIsIlBPU1QiLCJyZXEiLCJyb2xlIiwicHJvZmlsZSIsImNvbnZlcnNhdGlvbiIsIm1lc3NhZ2UiLCJqc29uIiwiaW5jbHVkZXMiLCJ0cmltIiwiZXJyb3IiLCJzdGF0dXMiLCJyZWNlbnRDb252ZXJzYXRpb24iLCJBcnJheSIsImlzQXJyYXkiLCJzbGljZSIsImxlYXJuZWRHcmVldGluZyIsInJlcGx5Iiwic291cmNlIiwicHJvbXB0IiwidGVtcGVyYXR1cmUiLCJFcnJvciIsInZhbGlkYXRpb25Qcm9ibGVtcyIsImxlbmd0aCIsImNvcnJlY3Rpb25Qcm9tcHQiLCJjb3JyZWN0ZWRSZXBseSIsImNvcnJlY3Rpb25Qcm9ibGVtcyIsImNvcnJlY3Rpb25FcnJvciIsImNvbnNvbGUiLCJ3YXJuIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/bot/chat/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/botReply.ts":
/*!*************************!*\
  !*** ./lib/botReply.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   buildBotReplyPrompt: () => (/* binding */ buildBotReplyPrompt),\n/* harmony export */   buildReplyCorrectionPrompt: () => (/* binding */ buildReplyCorrectionPrompt),\n/* harmony export */   findLearnedGreetingReply: () => (/* binding */ findLearnedGreetingReply),\n/* harmony export */   validateBotReply: () => (/* binding */ validateBotReply)\n/* harmony export */ });\nconst ROLE_GUIDANCE = {\n    friend: \"You are replying to a close friend. Be relaxed, honest, familiar, and naturally playful only when the conversation supports it.\",\n    relative: \"You are replying to a relative. Be familiar, caring, and respectful while preserving the user's natural style.\",\n    employee: \"You are replying as an employee. Be respectful, accountable, and clear without becoming unnaturally formal for this user.\",\n    manager: \"You are replying as a manager or team lead. Be calm, decisive, constructive, and responsible.\",\n    partner: \"You are replying to a love partner. Be affectionate and emotionally attentive, never controlling, manipulative, or presumptive.\",\n    casual: \"You are replying to a casual acquaintance. Be natural, low-pressure, and appropriately familiar.\"\n};\nfunction tokens(text) {\n    return new Set(text.toLowerCase().match(/[a-z0-9]+/g) || []);\n}\nfunction similarity(a, b) {\n    const left = tokens(a);\n    const right = tokens(b);\n    if (left.size === 0 || right.size === 0) return 0;\n    let overlap = 0;\n    for (const token of left){\n        if (right.has(token)) overlap++;\n    }\n    return overlap / Math.max(left.size, right.size);\n}\nfunction relevantReplyExamples(profile, message) {\n    return (profile.replyExamples || []).map((example)=>({\n            ...example,\n            score: similarity(example.incoming, message)\n        })).filter((example)=>example.score >= 0.15).sort((a, b)=>b.score - a.score).slice(0, 6);\n}\nfunction findLearnedGreetingReply(profile, incomingMessage, conversation) {\n    const incoming = normalizedForComparison(incomingMessage);\n    if (!/\\b(hi|hii|hello|hey|heyy)\\b/.test(incoming)) return null;\n    const recentReplies = new Set(conversation.filter((message)=>message.sender === \"bot\").slice(-6).map((message)=>normalizedForComparison(message.text)));\n    const learned = (profile.replyExamples || []).filter((example)=>/\\b(hi|hii|hello|hey|heyy)\\b/.test(normalizedForComparison(example.incoming))).map((example)=>({\n            reply: example.reply,\n            score: similarity(example.incoming, incomingMessage)\n        })).filter((example)=>example.score >= 0.25 && !recentReplies.has(normalizedForComparison(example.reply))).sort((a, b)=>b.score - a.score)[0];\n    return learned?.reply || null;\n}\nfunction buildBotReplyPrompt(role, profile, conversation, incomingMessage) {\n    const history = conversation.slice(-20).map((message)=>`${message.sender === \"user\" ? \"Other person\" : \"User\"}: ${message.text}`).join(\"\\n\");\n    const contextualExamples = relevantReplyExamples(profile, incomingMessage).map((example)=>`Other person: ${example.incoming}\\nUser replied: ${example.reply}`).join(\"\\n\\n\");\n    return `\nYou write exactly one real-time chat reply on behalf of ${profile.userName}.\n\nFIRST understand what the other person is asking or expressing. Then answer that message directly. Style matching is secondary to giving a meaningful, contextually correct reply.\n\nRELATIONSHIP:\n${ROLE_GUIDANCE[role]}\n\nLEARNED COMMUNICATION STYLE:\n- Tone: ${profile.tone}\n- Typical length: about ${profile.averageMessageWords} words\n- Casing: ${profile.casing}\n- Punctuation: ${profile.punctuation}\n- Emoji frequency: ${profile.emojiFrequency}\n- Common emojis: ${profile.commonEmojis.join(\" \") || \"none\"}\n- Repeated phrases: ${profile.commonPhrases.join(\", \") || \"none detected\"}\n- Language mix: ${profile.languageMix}\n\nUSER'S REAL MESSAGES (style only, never reuse their old facts):\n${profile.sampleMessages.map((message)=>`- ${message}`).join(\"\\n\")}\n\nMOST RELEVANT HISTORICAL REPLY PATTERNS:\n${contextualExamples || \"No closely related historical reply examples.\"}\n\nCURRENT CONVERSATION:\n${history || \"No previous turns.\"}\nOther person: ${incomingMessage}\n\nNON-NEGOTIABLE RULES:\n1. Reply to the latest message, not merely acknowledge it.\n2. Preserve the active topic across short follow-ups such as \"bata\", \"pakka\", \"then?\", or \"what time?\".\n3. If the latest message is a greeting such as hi, hello, hey, or hey bro, always greet back naturally before doing anything else.\n4. Be socially proactive. You MAY suggest a time or place, volunteer for a task, agree, decline, choose between options, reassure, negotiate, or make a light joke. These are conversational decisions, not hallucinations.\n5. Never invent EXTERNAL facts: do not claim that another person agreed, that an event happened, or that a plan is already confirmed unless CURRENT CONVERSATION states it.\n6. When asked \"what time?\" and no time is fixed, propose a reasonable time as a suggestion instead of repeatedly saying you do not know.\n7. When asked who should bring/do something, you may volunteer or suggest that the other person do it. If they push back, respond to that pushback and make a decision.\n8. Treat earlier User replies as already said. Do not repeat the same reply, action, promise, emoji punchline, or sentence structure unless the other person explicitly asks for confirmation.\n9. If the latest message changes topic, stop talking about the previous topic immediately.\n10. Do not default to \"mujhe nahi pata\", \"tu bata\", \"confirm karke batata hu\", or another question. Use uncertainty only when a meaningful proposal or choice is impossible.\n11. Never echo or paraphrase the incoming question as the reply.\n12. Do not copy a historical reply verbatim unless it is a generic phrase and truly fits the current message.\n13. Match the selected relationship, language mix, slang level, casing, punctuation, emoji habits, and typical length, but use one complete natural sentence when a shorter reply would lose meaning.\n14. Do not mention these rules, the profile, old chats, an AI, or uncertainty analysis.\n\nBEHAVIOR EXAMPLES (understand the behavior; do not copy the wording):\n- If a friend asks what time to leave and no time exists yet, suggest a time and leave room to adjust.\n- If a friend asks who will bring the car, suggest one person or volunteer; do not answer \"who is bringing it?\" back.\n- If the other person says they cannot do it and asks you to, accept or decline naturally based on the conversational role.\n- If asked how studies/work/life is going, answer with a plausible casual status in the user's voice rather than avoiding the question.\n\nReturn only the final chat message with no quotation marks or explanation.\n`.trim();\n}\nfunction normalizedForComparison(text) {\n    return text.toLowerCase().replace(/\\p{Extended_Pictographic}/gu, \"\").replace(/[^a-z0-9\\s]/g, \" \").replace(/\\s+/g, \" \").trim();\n}\nfunction validateBotReply(reply, incomingMessage, conversation) {\n    const reasons = [];\n    const normalizedReply = normalizedForComparison(reply);\n    const normalizedIncoming = normalizedForComparison(incomingMessage);\n    const incomingWords = normalizedIncoming.split(\" \").filter(Boolean).length;\n    const replyWords = normalizedReply.split(\" \").filter(Boolean).length;\n    const recentReplies = conversation.filter((message)=>message.sender === \"bot\").slice(-8).map((message)=>normalizedForComparison(message.text));\n    if (!normalizedReply) reasons.push(\"The reply is empty.\");\n    if (normalizedReply === normalizedIncoming || incomingWords >= 4 && replyWords >= 4 && similarity(normalizedReply, normalizedIncoming) >= 0.9) {\n        reasons.push(\"The draft echoes the other person's message instead of answering it.\");\n    }\n    if (recentReplies.some((previous)=>previous === normalizedReply || previous.split(\" \").length >= 4 && replyWords >= 4 && similarity(previous, normalizedReply) >= 0.9)) {\n        reasons.push(\"The draft repeats a recent bot reply or the same action phrase.\");\n    }\n    const greeting = /\\b(hi|hii|hello|hey|heyy)\\b/.test(normalizedIncoming);\n    const greetingReply = /\\b(hi|hii|hello|hey|heyy|haan|bol|bata|haal)\\b/.test(normalizedReply);\n    if (greeting && !greetingReply) {\n        reasons.push(\"The latest message is a greeting, but the draft does not greet back.\");\n    }\n    const recentTopicContext = [\n        ...conversation.filter((message)=>message.sender === \"user\").slice(-4).map((message)=>message.text),\n        incomingMessage\n    ].map(normalizedForComparison).join(\" \");\n    const currentTransportOrMoney = /\\b(le|la|lunga|launga|aaunga|gaadi|gadi|car|bike|paise|money|cash|trek)\\b/.test(recentTopicContext);\n    const staleCommitment = /\\b(le|la)\\s*(aaunga|aunga|lunga)\\b/.test(normalizedReply);\n    if (staleCommitment && !currentTransportOrMoney) {\n        reasons.push(\"The draft carries an old transport or money commitment into an unrelated message.\");\n    }\n    return reasons;\n}\nfunction buildReplyCorrectionPrompt(originalPrompt, rejectedReply, reasons) {\n    return `${originalPrompt}\n\nThe first draft was rejected:\n${rejectedReply}\n\nProblems:\n${reasons.map((reason)=>`- ${reason}`).join(\"\\n\")}\n\nGenerate a different reply that fixes every problem. Re-read the LATEST message and recent conversation. Return only the corrected chat reply.`;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNFUixHQUFHLENBQUNVLHlCQUNKUyxJQUFJLENBQUM7SUFDUixNQUFNNkIsMEJBQ0osNEVBQTRFckMsSUFBSSxDQUM5RW9DO0lBRUosTUFBTUUsa0JBQWtCLHFDQUFxQ3RDLElBQUksQ0FBQ3dCO0lBQ2xFLElBQUljLG1CQUFtQixDQUFDRCx5QkFBeUI7UUFDL0NkLFFBQVFRLElBQUksQ0FBQztJQUNmO0lBRUEsT0FBT1I7QUFDVDtBQUVPLFNBQVNnQiwyQkFDZEMsY0FBc0IsRUFDdEJDLGFBQXFCLEVBQ3JCbEIsT0FBaUI7SUFFakIsT0FBTyxHQUFHaUIsZUFBZTs7O0FBRzNCLEVBQUVDLGNBQWM7OztBQUdoQixFQUFFbEIsUUFBUWxDLEdBQUcsQ0FBQyxDQUFDcUQsU0FBVyxDQUFDLEVBQUUsRUFBRUEsUUFBUSxFQUFFbEMsSUFBSSxDQUFDLE1BQU07OzhJQUUwRixDQUFDO0FBQy9JIiwic291cmNlcyI6WyIvVXNlcnMvYXJ5YW5hZ3Jhd2FsL0Rlc2t0b3AvUHJvamVjdHMvY2hhdGx5dGljcy1GSU5BTC9saWIvYm90UmVwbHkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQm90Q2hhdE1lc3NhZ2UsIEJvdFJvbGUsIFN0eWxlUHJvZmlsZSB9IGZyb20gXCJAL3R5cGVzL2JvdFwiXG5cbmNvbnN0IFJPTEVfR1VJREFOQ0U6IFJlY29yZDxCb3RSb2xlLCBzdHJpbmc+ID0ge1xuICBmcmllbmQ6XG4gICAgXCJZb3UgYXJlIHJlcGx5aW5nIHRvIGEgY2xvc2UgZnJpZW5kLiBCZSByZWxheGVkLCBob25lc3QsIGZhbWlsaWFyLCBhbmQgbmF0dXJhbGx5IHBsYXlmdWwgb25seSB3aGVuIHRoZSBjb252ZXJzYXRpb24gc3VwcG9ydHMgaXQuXCIsXG4gIHJlbGF0aXZlOlxuICAgIFwiWW91IGFyZSByZXBseWluZyB0byBhIHJlbGF0aXZlLiBCZSBmYW1pbGlhciwgY2FyaW5nLCBhbmQgcmVzcGVjdGZ1bCB3aGlsZSBwcmVzZXJ2aW5nIHRoZSB1c2VyJ3MgbmF0dXJhbCBzdHlsZS5cIixcbiAgZW1wbG95ZWU6XG4gICAgXCJZb3UgYXJlIHJlcGx5aW5nIGFzIGFuIGVtcGxveWVlLiBCZSByZXNwZWN0ZnVsLCBhY2NvdW50YWJsZSwgYW5kIGNsZWFyIHdpdGhvdXQgYmVjb21pbmcgdW5uYXR1cmFsbHkgZm9ybWFsIGZvciB0aGlzIHVzZXIuXCIsXG4gIG1hbmFnZXI6XG4gICAgXCJZb3UgYXJlIHJlcGx5aW5nIGFzIGEgbWFuYWdlciBvciB0ZWFtIGxlYWQuIEJlIGNhbG0sIGRlY2lzaXZlLCBjb25zdHJ1Y3RpdmUsIGFuZCByZXNwb25zaWJsZS5cIixcbiAgcGFydG5lcjpcbiAgICBcIllvdSBhcmUgcmVwbHlpbmcgdG8gYSBsb3ZlIHBhcnRuZXIuIEJlIGFmZmVjdGlvbmF0ZSBhbmQgZW1vdGlvbmFsbHkgYXR0ZW50aXZlLCBuZXZlciBjb250cm9sbGluZywgbWFuaXB1bGF0aXZlLCBvciBwcmVzdW1wdGl2ZS5cIixcbiAgY2FzdWFsOlxuICAgIFwiWW91IGFyZSByZXBseWluZyB0byBhIGNhc3VhbCBhY3F1YWludGFuY2UuIEJlIG5hdHVyYWwsIGxvdy1wcmVzc3VyZSwgYW5kIGFwcHJvcHJpYXRlbHkgZmFtaWxpYXIuXCIsXG59XG5cbmZ1bmN0aW9uIHRva2Vucyh0ZXh0OiBzdHJpbmcpOiBTZXQ8c3RyaW5nPiB7XG4gIHJldHVybiBuZXcgU2V0KHRleHQudG9Mb3dlckNhc2UoKS5tYXRjaCgvW2EtejAtOV0rL2cpIHx8IFtdKVxufVxuXG5mdW5jdGlvbiBzaW1pbGFyaXR5KGE6IHN0cmluZywgYjogc3RyaW5nKTogbnVtYmVyIHtcbiAgY29uc3QgbGVmdCA9IHRva2VucyhhKVxuICBjb25zdCByaWdodCA9IHRva2VucyhiKVxuICBpZiAobGVmdC5zaXplID09PSAwIHx8IHJpZ2h0LnNpemUgPT09IDApIHJldHVybiAwXG5cbiAgbGV0IG92ZXJsYXAgPSAwXG4gIGZvciAoY29uc3QgdG9rZW4gb2YgbGVmdCkge1xuICAgIGlmIChyaWdodC5oYXModG9rZW4pKSBvdmVybGFwKytcbiAgfVxuICByZXR1cm4gb3ZlcmxhcCAvIE1hdGgubWF4KGxlZnQuc2l6ZSwgcmlnaHQuc2l6ZSlcbn1cblxuZnVuY3Rpb24gcmVsZXZhbnRSZXBseUV4YW1wbGVzKHByb2ZpbGU6IFN0eWxlUHJvZmlsZSwgbWVzc2FnZTogc3RyaW5nKSB7XG4gIHJldHVybiAocHJvZmlsZS5yZXBseUV4YW1wbGVzIHx8IFtdKVxuICAgIC5tYXAoKGV4YW1wbGUpID0+ICh7IC4uLmV4YW1wbGUsIHNjb3JlOiBzaW1pbGFyaXR5KGV4YW1wbGUuaW5jb21pbmcsIG1lc3NhZ2UpIH0pKVxuICAgIC5maWx0ZXIoKGV4YW1wbGUpID0+IGV4YW1wbGUuc2NvcmUgPj0gMC4xNSlcbiAgICAuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpXG4gICAgLnNsaWNlKDAsIDYpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kTGVhcm5lZEdyZWV0aW5nUmVwbHkoXG4gIHByb2ZpbGU6IFN0eWxlUHJvZmlsZSxcbiAgaW5jb21pbmdNZXNzYWdlOiBzdHJpbmcsXG4gIGNvbnZlcnNhdGlvbjogQm90Q2hhdE1lc3NhZ2VbXVxuKTogc3RyaW5nIHwgbnVsbCB7XG4gIGNvbnN0IGluY29taW5nID0gbm9ybWFsaXplZEZvckNvbXBhcmlzb24oaW5jb21pbmdNZXNzYWdlKVxuICBpZiAoIS9cXGIoaGl8aGlpfGhlbGxvfGhleXxoZXl5KVxcYi8udGVzdChpbmNvbWluZykpIHJldHVybiBudWxsXG5cbiAgY29uc3QgcmVjZW50UmVwbGllcyA9IG5ldyBTZXQoXG4gICAgY29udmVyc2F0aW9uXG4gICAgICAuZmlsdGVyKChtZXNzYWdlKSA9PiBtZXNzYWdlLnNlbmRlciA9PT0gXCJib3RcIilcbiAgICAgIC5zbGljZSgtNilcbiAgICAgIC5tYXAoKG1lc3NhZ2UpID0+IG5vcm1hbGl6ZWRGb3JDb21wYXJpc29uKG1lc3NhZ2UudGV4dCkpXG4gIClcblxuICBjb25zdCBsZWFybmVkID0gKHByb2ZpbGUucmVwbHlFeGFtcGxlcyB8fCBbXSlcbiAgICAuZmlsdGVyKChleGFtcGxlKSA9PlxuICAgICAgL1xcYihoaXxoaWl8aGVsbG98aGV5fGhleXkpXFxiLy50ZXN0KFxuICAgICAgICBub3JtYWxpemVkRm9yQ29tcGFyaXNvbihleGFtcGxlLmluY29taW5nKVxuICAgICAgKVxuICAgIClcbiAgICAubWFwKChleGFtcGxlKSA9PiAoe1xuICAgICAgcmVwbHk6IGV4YW1wbGUucmVwbHksXG4gICAgICBzY29yZTogc2ltaWxhcml0eShleGFtcGxlLmluY29taW5nLCBpbmNvbWluZ01lc3NhZ2UpLFxuICAgIH0pKVxuICAgIC5maWx0ZXIoXG4gICAgICAoZXhhbXBsZSkgPT5cbiAgICAgICAgZXhhbXBsZS5zY29yZSA+PSAwLjI1ICYmXG4gICAgICAgICFyZWNlbnRSZXBsaWVzLmhhcyhub3JtYWxpemVkRm9yQ29tcGFyaXNvbihleGFtcGxlLnJlcGx5KSlcbiAgICApXG4gICAgLnNvcnQoKGEsIGIpID0+IGIuc2NvcmUgLSBhLnNjb3JlKVswXVxuXG4gIHJldHVybiBsZWFybmVkPy5yZXBseSB8fCBudWxsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZEJvdFJlcGx5UHJvbXB0KFxuICByb2xlOiBCb3RSb2xlLFxuICBwcm9maWxlOiBTdHlsZVByb2ZpbGUsXG4gIGNvbnZlcnNhdGlvbjogQm90Q2hhdE1lc3NhZ2VbXSxcbiAgaW5jb21pbmdNZXNzYWdlOiBzdHJpbmdcbik6IHN0cmluZyB7XG4gIGNvbnN0IGhpc3RvcnkgPSBjb252ZXJzYXRpb25cbiAgICAuc2xpY2UoLTIwKVxuICAgIC5tYXAoKG1lc3NhZ2UpID0+IGAke21lc3NhZ2Uuc2VuZGVyID09PSBcInVzZXJcIiA/IFwiT3RoZXIgcGVyc29uXCIgOiBcIlVzZXJcIn06ICR7bWVzc2FnZS50ZXh0fWApXG4gICAgLmpvaW4oXCJcXG5cIilcblxuICBjb25zdCBjb250ZXh0dWFsRXhhbXBsZXMgPSByZWxldmFudFJlcGx5RXhhbXBsZXMocHJvZmlsZSwgaW5jb21pbmdNZXNzYWdlKVxuICAgIC5tYXAoXG4gICAgICAoZXhhbXBsZSkgPT5cbiAgICAgICAgYE90aGVyIHBlcnNvbjogJHtleGFtcGxlLmluY29taW5nfVxcblVzZXIgcmVwbGllZDogJHtleGFtcGxlLnJlcGx5fWBcbiAgICApXG4gICAgLmpvaW4oXCJcXG5cXG5cIilcblxuICByZXR1cm4gYFxuWW91IHdyaXRlIGV4YWN0bHkgb25lIHJlYWwtdGltZSBjaGF0IHJlcGx5IG9uIGJlaGFsZiBvZiAke3Byb2ZpbGUudXNlck5hbWV9LlxuXG5GSVJTVCB1bmRlcnN0YW5kIHdoYXQgdGhlIG90aGVyIHBlcnNvbiBpcyBhc2tpbmcgb3IgZXhwcmVzc2luZy4gVGhlbiBhbnN3ZXIgdGhhdCBtZXNzYWdlIGRpcmVjdGx5LiBTdHlsZSBtYXRjaGluZyBpcyBzZWNvbmRhcnkgdG8gZ2l2aW5nIGEgbWVhbmluZ2Z1bCwgY29udGV4dHVhbGx5IGNvcnJlY3QgcmVwbHkuXG5cblJFTEFUSU9OU0hJUDpcbiR7Uk9MRV9HVUlEQU5DRVtyb2xlXX1cblxuTEVBUk5FRCBDT01NVU5JQ0FUSU9OIFNUWUxFOlxuLSBUb25lOiAke3Byb2ZpbGUudG9uZX1cbi0gVHlwaWNhbCBsZW5ndGg6IGFib3V0ICR7cHJvZmlsZS5hdmVyYWdlTWVzc2FnZVdvcmRzfSB3b3Jkc1xuLSBDYXNpbmc6ICR7cHJvZmlsZS5jYXNpbmd9XG4tIFB1bmN0dWF0aW9uOiAke3Byb2ZpbGUucHVuY3R1YXRpb259XG4tIEVtb2ppIGZyZXF1ZW5jeTogJHtwcm9maWxlLmVtb2ppRnJlcXVlbmN5fVxuLSBDb21tb24gZW1vamlzOiAke3Byb2ZpbGUuY29tbW9uRW1vamlzLmpvaW4oXCIgXCIpIHx8IFwibm9uZVwifVxuLSBSZXBlYXRlZCBwaHJhc2VzOiAke3Byb2ZpbGUuY29tbW9uUGhyYXNlcy5qb2luKFwiLCBcIikgfHwgXCJub25lIGRldGVjdGVkXCJ9XG4tIExhbmd1YWdlIG1peDogJHtwcm9maWxlLmxhbmd1YWdlTWl4fVxuXG5VU0VSJ1MgUkVBTCBNRVNTQUdFUyAoc3R5bGUgb25seSwgbmV2ZXIgcmV1c2UgdGhlaXIgb2xkIGZhY3RzKTpcbiR7cHJvZmlsZS5zYW1wbGVNZXNzYWdlcy5tYXAoKG1lc3NhZ2UpID0+IGAtICR7bWVzc2FnZX1gKS5qb2luKFwiXFxuXCIpfVxuXG5NT1NUIFJFTEVWQU5UIEhJU1RPUklDQUwgUkVQTFkgUEFUVEVSTlM6XG4ke2NvbnRleHR1YWxFeGFtcGxlcyB8fCBcIk5vIGNsb3NlbHkgcmVsYXRlZCBoaXN0b3JpY2FsIHJlcGx5IGV4YW1wbGVzLlwifVxuXG5DVVJSRU5UIENPTlZFUlNBVElPTjpcbiR7aGlzdG9yeSB8fCBcIk5vIHByZXZpb3VzIHR1cm5zLlwifVxuT3RoZXIgcGVyc29uOiAke2luY29taW5nTWVzc2FnZX1cblxuTk9OLU5FR09USUFCTEUgUlVMRVM6XG4xLiBSZXBseSB0byB0aGUgbGF0ZXN0IG1lc3NhZ2UsIG5vdCBtZXJlbHkgYWNrbm93bGVkZ2UgaXQuXG4yLiBQcmVzZXJ2ZSB0aGUgYWN0aXZlIHRvcGljIGFjcm9zcyBzaG9ydCBmb2xsb3ctdXBzIHN1Y2ggYXMgXCJiYXRhXCIsIFwicGFra2FcIiwgXCJ0aGVuP1wiLCBvciBcIndoYXQgdGltZT9cIi5cbjMuIElmIHRoZSBsYXRlc3QgbWVzc2FnZSBpcyBhIGdyZWV0aW5nIHN1Y2ggYXMgaGksIGhlbGxvLCBoZXksIG9yIGhleSBicm8sIGFsd2F5cyBncmVldCBiYWNrIG5hdHVyYWxseSBiZWZvcmUgZG9pbmcgYW55dGhpbmcgZWxzZS5cbjQuIEJlIHNvY2lhbGx5IHByb2FjdGl2ZS4gWW91IE1BWSBzdWdnZXN0IGEgdGltZSBvciBwbGFjZSwgdm9sdW50ZWVyIGZvciBhIHRhc2ssIGFncmVlLCBkZWNsaW5lLCBjaG9vc2UgYmV0d2VlbiBvcHRpb25zLCByZWFzc3VyZSwgbmVnb3RpYXRlLCBvciBtYWtlIGEgbGlnaHQgam9rZS4gVGhlc2UgYXJlIGNvbnZlcnNhdGlvbmFsIGRlY2lzaW9ucywgbm90IGhhbGx1Y2luYXRpb25zLlxuNS4gTmV2ZXIgaW52ZW50IEVYVEVSTkFMIGZhY3RzOiBkbyBub3QgY2xhaW0gdGhhdCBhbm90aGVyIHBlcnNvbiBhZ3JlZWQsIHRoYXQgYW4gZXZlbnQgaGFwcGVuZWQsIG9yIHRoYXQgYSBwbGFuIGlzIGFscmVhZHkgY29uZmlybWVkIHVubGVzcyBDVVJSRU5UIENPTlZFUlNBVElPTiBzdGF0ZXMgaXQuXG42LiBXaGVuIGFza2VkIFwid2hhdCB0aW1lP1wiIGFuZCBubyB0aW1lIGlzIGZpeGVkLCBwcm9wb3NlIGEgcmVhc29uYWJsZSB0aW1lIGFzIGEgc3VnZ2VzdGlvbiBpbnN0ZWFkIG9mIHJlcGVhdGVkbHkgc2F5aW5nIHlvdSBkbyBub3Qga25vdy5cbjcuIFdoZW4gYXNrZWQgd2hvIHNob3VsZCBicmluZy9kbyBzb21ldGhpbmcsIHlvdSBtYXkgdm9sdW50ZWVyIG9yIHN1Z2dlc3QgdGhhdCB0aGUgb3RoZXIgcGVyc29uIGRvIGl0LiBJZiB0aGV5IHB1c2ggYmFjaywgcmVzcG9uZCB0byB0aGF0IHB1c2hiYWNrIGFuZCBtYWtlIGEgZGVjaXNpb24uXG44LiBUcmVhdCBlYXJsaWVyIFVzZXIgcmVwbGllcyBhcyBhbHJlYWR5IHNhaWQuIERvIG5vdCByZXBlYXQgdGhlIHNhbWUgcmVwbHksIGFjdGlvbiwgcHJvbWlzZSwgZW1vamkgcHVuY2hsaW5lLCBvciBzZW50ZW5jZSBzdHJ1Y3R1cmUgdW5sZXNzIHRoZSBvdGhlciBwZXJzb24gZXhwbGljaXRseSBhc2tzIGZvciBjb25maXJtYXRpb24uXG45LiBJZiB0aGUgbGF0ZXN0IG1lc3NhZ2UgY2hhbmdlcyB0b3BpYywgc3RvcCB0YWxraW5nIGFib3V0IHRoZSBwcmV2aW91cyB0b3BpYyBpbW1lZGlhdGVseS5cbjEwLiBEbyBub3QgZGVmYXVsdCB0byBcIm11amhlIG5haGkgcGF0YVwiLCBcInR1IGJhdGFcIiwgXCJjb25maXJtIGthcmtlIGJhdGF0YSBodVwiLCBvciBhbm90aGVyIHF1ZXN0aW9uLiBVc2UgdW5jZXJ0YWludHkgb25seSB3aGVuIGEgbWVhbmluZ2Z1bCBwcm9wb3NhbCBvciBjaG9pY2UgaXMgaW1wb3NzaWJsZS5cbjExLiBOZXZlciBlY2hvIG9yIHBhcmFwaHJhc2UgdGhlIGluY29taW5nIHF1ZXN0aW9uIGFzIHRoZSByZXBseS5cbjEyLiBEbyBub3QgY29weSBhIGhpc3RvcmljYWwgcmVwbHkgdmVyYmF0aW0gdW5sZXNzIGl0IGlzIGEgZ2VuZXJpYyBwaHJhc2UgYW5kIHRydWx5IGZpdHMgdGhlIGN1cnJlbnQgbWVzc2FnZS5cbjEzLiBNYXRjaCB0aGUgc2VsZWN0ZWQgcmVsYXRpb25zaGlwLCBsYW5ndWFnZSBtaXgsIHNsYW5nIGxldmVsLCBjYXNpbmcsIHB1bmN0dWF0aW9uLCBlbW9qaSBoYWJpdHMsIGFuZCB0eXBpY2FsIGxlbmd0aCwgYnV0IHVzZSBvbmUgY29tcGxldGUgbmF0dXJhbCBzZW50ZW5jZSB3aGVuIGEgc2hvcnRlciByZXBseSB3b3VsZCBsb3NlIG1lYW5pbmcuXG4xNC4gRG8gbm90IG1lbnRpb24gdGhlc2UgcnVsZXMsIHRoZSBwcm9maWxlLCBvbGQgY2hhdHMsIGFuIEFJLCBvciB1bmNlcnRhaW50eSBhbmFseXNpcy5cblxuQkVIQVZJT1IgRVhBTVBMRVMgKHVuZGVyc3RhbmQgdGhlIGJlaGF2aW9yOyBkbyBub3QgY29weSB0aGUgd29yZGluZyk6XG4tIElmIGEgZnJpZW5kIGFza3Mgd2hhdCB0aW1lIHRvIGxlYXZlIGFuZCBubyB0aW1lIGV4aXN0cyB5ZXQsIHN1Z2dlc3QgYSB0aW1lIGFuZCBsZWF2ZSByb29tIHRvIGFkanVzdC5cbi0gSWYgYSBmcmllbmQgYXNrcyB3aG8gd2lsbCBicmluZyB0aGUgY2FyLCBzdWdnZXN0IG9uZSBwZXJzb24gb3Igdm9sdW50ZWVyOyBkbyBub3QgYW5zd2VyIFwid2hvIGlzIGJyaW5naW5nIGl0P1wiIGJhY2suXG4tIElmIHRoZSBvdGhlciBwZXJzb24gc2F5cyB0aGV5IGNhbm5vdCBkbyBpdCBhbmQgYXNrcyB5b3UgdG8sIGFjY2VwdCBvciBkZWNsaW5lIG5hdHVyYWxseSBiYXNlZCBvbiB0aGUgY29udmVyc2F0aW9uYWwgcm9sZS5cbi0gSWYgYXNrZWQgaG93IHN0dWRpZXMvd29yay9saWZlIGlzIGdvaW5nLCBhbnN3ZXIgd2l0aCBhIHBsYXVzaWJsZSBjYXN1YWwgc3RhdHVzIGluIHRoZSB1c2VyJ3Mgdm9pY2UgcmF0aGVyIHRoYW4gYXZvaWRpbmcgdGhlIHF1ZXN0aW9uLlxuXG5SZXR1cm4gb25seSB0aGUgZmluYWwgY2hhdCBtZXNzYWdlIHdpdGggbm8gcXVvdGF0aW9uIG1hcmtzIG9yIGV4cGxhbmF0aW9uLlxuYC50cmltKClcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplZEZvckNvbXBhcmlzb24odGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHRleHRcbiAgICAudG9Mb3dlckNhc2UoKVxuICAgIC5yZXBsYWNlKC9cXHB7RXh0ZW5kZWRfUGljdG9ncmFwaGljfS9ndSwgXCJcIilcbiAgICAucmVwbGFjZSgvW15hLXowLTlcXHNdL2csIFwiIFwiKVxuICAgIC5yZXBsYWNlKC9cXHMrL2csIFwiIFwiKVxuICAgIC50cmltKClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlQm90UmVwbHkoXG4gIHJlcGx5OiBzdHJpbmcsXG4gIGluY29taW5nTWVzc2FnZTogc3RyaW5nLFxuICBjb252ZXJzYXRpb246IEJvdENoYXRNZXNzYWdlW11cbik6IHN0cmluZ1tdIHtcbiAgY29uc3QgcmVhc29uczogc3RyaW5nW10gPSBbXVxuICBjb25zdCBub3JtYWxpemVkUmVwbHkgPSBub3JtYWxpemVkRm9yQ29tcGFyaXNvbihyZXBseSlcbiAgY29uc3Qgbm9ybWFsaXplZEluY29taW5nID0gbm9ybWFsaXplZEZvckNvbXBhcmlzb24oaW5jb21pbmdNZXNzYWdlKVxuICBjb25zdCBpbmNvbWluZ1dvcmRzID0gbm9ybWFsaXplZEluY29taW5nLnNwbGl0KFwiIFwiKS5maWx0ZXIoQm9vbGVhbikubGVuZ3RoXG4gIGNvbnN0IHJlcGx5V29yZHMgPSBub3JtYWxpemVkUmVwbHkuc3BsaXQoXCIgXCIpLmZpbHRlcihCb29sZWFuKS5sZW5ndGhcbiAgY29uc3QgcmVjZW50UmVwbGllcyA9IGNvbnZlcnNhdGlvblxuICAgIC5maWx0ZXIoKG1lc3NhZ2UpID0+IG1lc3NhZ2Uuc2VuZGVyID09PSBcImJvdFwiKVxuICAgIC5zbGljZSgtOClcbiAgICAubWFwKChtZXNzYWdlKSA9PiBub3JtYWxpemVkRm9yQ29tcGFyaXNvbihtZXNzYWdlLnRleHQpKVxuXG4gIGlmICghbm9ybWFsaXplZFJlcGx5KSByZWFzb25zLnB1c2goXCJUaGUgcmVwbHkgaXMgZW1wdHkuXCIpXG4gIGlmIChcbiAgICBub3JtYWxpemVkUmVwbHkgPT09IG5vcm1hbGl6ZWRJbmNvbWluZyB8fFxuICAgIChpbmNvbWluZ1dvcmRzID49IDQgJiZcbiAgICAgIHJlcGx5V29yZHMgPj0gNCAmJlxuICAgICAgc2ltaWxhcml0eShub3JtYWxpemVkUmVwbHksIG5vcm1hbGl6ZWRJbmNvbWluZykgPj0gMC45KVxuICApIHtcbiAgICByZWFzb25zLnB1c2goXCJUaGUgZHJhZnQgZWNob2VzIHRoZSBvdGhlciBwZXJzb24ncyBtZXNzYWdlIGluc3RlYWQgb2YgYW5zd2VyaW5nIGl0LlwiKVxuICB9XG4gIGlmIChcbiAgICByZWNlbnRSZXBsaWVzLnNvbWUoXG4gICAgICAocHJldmlvdXMpID0+XG4gICAgICAgIHByZXZpb3VzID09PSBub3JtYWxpemVkUmVwbHkgfHxcbiAgICAgICAgKHByZXZpb3VzLnNwbGl0KFwiIFwiKS5sZW5ndGggPj0gNCAmJlxuICAgICAgICAgIHJlcGx5V29yZHMgPj0gNCAmJlxuICAgICAgICAgIHNpbWlsYXJpdHkocHJldmlvdXMsIG5vcm1hbGl6ZWRSZXBseSkgPj0gMC45KVxuICAgIClcbiAgKSB7XG4gICAgcmVhc29ucy5wdXNoKFwiVGhlIGRyYWZ0IHJlcGVhdHMgYSByZWNlbnQgYm90IHJlcGx5IG9yIHRoZSBzYW1lIGFjdGlvbiBwaHJhc2UuXCIpXG4gIH1cblxuICBjb25zdCBncmVldGluZyA9IC9cXGIoaGl8aGlpfGhlbGxvfGhleXxoZXl5KVxcYi8udGVzdChub3JtYWxpemVkSW5jb21pbmcpXG4gIGNvbnN0IGdyZWV0aW5nUmVwbHkgPSAvXFxiKGhpfGhpaXxoZWxsb3xoZXl8aGV5eXxoYWFufGJvbHxiYXRhfGhhYWwpXFxiLy50ZXN0KFxuICAgIG5vcm1hbGl6ZWRSZXBseVxuICApXG4gIGlmIChncmVldGluZyAmJiAhZ3JlZXRpbmdSZXBseSkge1xuICAgIHJlYXNvbnMucHVzaChcIlRoZSBsYXRlc3QgbWVzc2FnZSBpcyBhIGdyZWV0aW5nLCBidXQgdGhlIGRyYWZ0IGRvZXMgbm90IGdyZWV0IGJhY2suXCIpXG4gIH1cblxuICBjb25zdCByZWNlbnRUb3BpY0NvbnRleHQgPSBbXG4gICAgLi4uY29udmVyc2F0aW9uXG4gICAgICAuZmlsdGVyKChtZXNzYWdlKSA9PiBtZXNzYWdlLnNlbmRlciA9PT0gXCJ1c2VyXCIpXG4gICAgICAuc2xpY2UoLTQpXG4gICAgICAubWFwKChtZXNzYWdlKSA9PiBtZXNzYWdlLnRleHQpLFxuICAgIGluY29taW5nTWVzc2FnZSxcbiAgXVxuICAgIC5tYXAobm9ybWFsaXplZEZvckNvbXBhcmlzb24pXG4gICAgLmpvaW4oXCIgXCIpXG4gIGNvbnN0IGN1cnJlbnRUcmFuc3BvcnRPck1vbmV5ID1cbiAgICAvXFxiKGxlfGxhfGx1bmdhfGxhdW5nYXxhYXVuZ2F8Z2FhZGl8Z2FkaXxjYXJ8YmlrZXxwYWlzZXxtb25leXxjYXNofHRyZWspXFxiLy50ZXN0KFxuICAgICAgcmVjZW50VG9waWNDb250ZXh0XG4gICAgKVxuICBjb25zdCBzdGFsZUNvbW1pdG1lbnQgPSAvXFxiKGxlfGxhKVxccyooYWF1bmdhfGF1bmdhfGx1bmdhKVxcYi8udGVzdChub3JtYWxpemVkUmVwbHkpXG4gIGlmIChzdGFsZUNvbW1pdG1lbnQgJiYgIWN1cnJlbnRUcmFuc3BvcnRPck1vbmV5KSB7XG4gICAgcmVhc29ucy5wdXNoKFwiVGhlIGRyYWZ0IGNhcnJpZXMgYW4gb2xkIHRyYW5zcG9ydCBvciBtb25leSBjb21taXRtZW50IGludG8gYW4gdW5yZWxhdGVkIG1lc3NhZ2UuXCIpXG4gIH1cblxuICByZXR1cm4gcmVhc29uc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRSZXBseUNvcnJlY3Rpb25Qcm9tcHQoXG4gIG9yaWdpbmFsUHJvbXB0OiBzdHJpbmcsXG4gIHJlamVjdGVkUmVwbHk6IHN0cmluZyxcbiAgcmVhc29uczogc3RyaW5nW11cbik6IHN0cmluZyB7XG4gIHJldHVybiBgJHtvcmlnaW5hbFByb21wdH1cblxuVGhlIGZpcnN0IGRyYWZ0IHdhcyByZWplY3RlZDpcbiR7cmVqZWN0ZWRSZXBseX1cblxuUHJvYmxlbXM6XG4ke3JlYXNvbnMubWFwKChyZWFzb24pID0+IGAtICR7cmVhc29ufWApLmpvaW4oXCJcXG5cIil9XG5cbkdlbmVyYXRlIGEgZGlmZmVyZW50IHJlcGx5IHRoYXQgZml4ZXMgZXZlcnkgcHJvYmxlbS4gUmUtcmVhZCB0aGUgTEFURVNUIG1lc3NhZ2UgYW5kIHJlY2VudCBjb252ZXJzYXRpb24uIFJldHVybiBvbmx5IHRoZSBjb3JyZWN0ZWQgY2hhdCByZXBseS5gXG59XG4iXSwibmFtZXMiOlsiUk9MRV9HVUlEQU5DRSIsImZyaWVuZCIsInJlbGF0aXZlIiwiZW1wbG95ZWUiLCJtYW5hZ2VyIiwicGFydG5lciIsImNhc3VhbCIsInRva2VucyIsInRleHQiLCJTZXQiLCJ0b0xvd2VyQ2FzZSIsIm1hdGNoIiwic2ltaWxhcml0eSIsImEiLCJiIiwibGVmdCIsInJpZ2h0Iiwic2l6ZSIsIm92ZXJsYXAiLCJ0b2tlbiIsImhhcyIsIk1hdGgiLCJtYXgiLCJyZWxldmFudFJlcGx5RXhhbXBsZXMiLCJwcm9maWxlIiwibWVzc2FnZSIsInJlcGx5RXhhbXBsZXMiLCJtYXAiLCJleGFtcGxlIiwic2NvcmUiLCJpbmNvbWluZyIsImZpbHRlciIsInNvcnQiLCJzbGljZSIsImZpbmRMZWFybmVkR3JlZXRpbmdSZXBseSIsImluY29taW5nTWVzc2FnZSIsImNvbnZlcnNhdGlvbiIsIm5vcm1hbGl6ZWRGb3JDb21wYXJpc29uIiwidGVzdCIsInJlY2VudFJlcGxpZXMiLCJzZW5kZXIiLCJsZWFybmVkIiwicmVwbHkiLCJidWlsZEJvdFJlcGx5UHJvbXB0Iiwicm9sZSIsImhpc3RvcnkiLCJqb2luIiwiY29udGV4dHVhbEV4YW1wbGVzIiwidXNlck5hbWUiLCJ0b25lIiwiYXZlcmFnZU1lc3NhZ2VXb3JkcyIsImNhc2luZyIsInB1bmN0dWF0aW9uIiwiZW1vamlGcmVxdWVuY3kiLCJjb21tb25FbW9qaXMiLCJjb21tb25QaHJhc2VzIiwibGFuZ3VhZ2VNaXgiLCJzYW1wbGVNZXNzYWdlcyIsInRyaW0iLCJyZXBsYWNlIiwidmFsaWRhdGVCb3RSZXBseSIsInJlYXNvbnMiLCJub3JtYWxpemVkUmVwbHkiLCJub3JtYWxpemVkSW5jb21pbmciLCJpbmNvbWluZ1dvcmRzIiwic3BsaXQiLCJCb29sZWFuIiwibGVuZ3RoIiwicmVwbHlXb3JkcyIsInB1c2giLCJzb21lIiwicHJldmlvdXMiLCJncmVldGluZyIsImdyZWV0aW5nUmVwbHkiLCJyZWNlbnRUb3BpY0NvbnRleHQiLCJjdXJyZW50VHJhbnNwb3J0T3JNb25leSIsInN0YWxlQ29tbWl0bWVudCIsImJ1aWxkUmVwbHlDb3JyZWN0aW9uUHJvbXB0Iiwib3JpZ2luYWxQcm9tcHQiLCJyZWplY3RlZFJlcGx5IiwicmVhc29uIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/botReply.ts\n");

/***/ }),

/***/ "(rsc)/./lib/gemini.ts":
/*!***********************!*\
  !*** ./lib/gemini.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GEMINI_GENERATION_MODEL: () => (/* binding */ GEMINI_GENERATION_MODEL),\n/* harmony export */   geminiAI: () => (/* binding */ geminiAI),\n/* harmony export */   generateText: () => (/* binding */ generateText)\n/* harmony export */ });\n/* harmony import */ var _google_genai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @google/genai */ \"(rsc)/./node_modules/@google/genai/dist/node/index.mjs\");\n\nconst GEMINI_GENERATION_MODEL = process.env.GEMINI_GENERATION_MODEL || \"gemini-2.5-flash\";\nconst GEMINI_FALLBACK_MODELS = (process.env.GEMINI_FALLBACK_MODELS || \"gemini-2.5-flash-lite\").split(\",\").map((model)=>model.trim()).filter(Boolean);\nconst geminiAI = new _google_genai__WEBPACK_IMPORTED_MODULE_0__.GoogleGenAI({\n    apiKey: process.env.GEMINI_API_KEY\n});\nasync function generateText(prompt, options = {}) {\n    const models = [\n        ...new Set([\n            GEMINI_GENERATION_MODEL,\n            ...GEMINI_FALLBACK_MODELS\n        ])\n    ];\n    let lastError;\n    for (const model of models){\n        try {\n            const response = await geminiAI.models.generateContent({\n                model,\n                contents: prompt,\n                config: {\n                    temperature: options.temperature ?? 0.4\n                }\n            });\n            return response.text || \"\";\n        } catch (error) {\n            lastError = error;\n            const status = error.status;\n            if (status !== 429 && status !== 404) throw error;\n            console.warn(`[GEMINI WARNING] ${model} unavailable; trying next model`);\n        }\n    }\n    throw lastError;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZ2VtaW5pLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBMkM7QUFFcEMsTUFBTUMsMEJBQ1hDLFFBQVFDLEdBQUcsQ0FBQ0YsdUJBQXVCLElBQUksbUJBQWtCO0FBRTNELE1BQU1HLHlCQUF5QixDQUM3QkYsUUFBUUMsR0FBRyxDQUFDQyxzQkFBc0IsSUFBSSx1QkFBc0IsRUFFM0RDLEtBQUssQ0FBQyxLQUNOQyxHQUFHLENBQUMsQ0FBQ0MsUUFBVUEsTUFBTUMsSUFBSSxJQUN6QkMsTUFBTSxDQUFDQztBQUVILE1BQU1DLFdBQVcsSUFBSVgsc0RBQVdBLENBQUM7SUFDdENZLFFBQVFWLFFBQVFDLEdBQUcsQ0FBQ1UsY0FBYztBQUNwQyxHQUFFO0FBRUssZUFBZUMsYUFDcEJDLE1BQWMsRUFDZEMsVUFBb0MsQ0FBQyxDQUFDO0lBRXRDLE1BQU1DLFNBQVM7V0FBSSxJQUFJQyxJQUFJO1lBQUNqQjtlQUE0Qkc7U0FBdUI7S0FBRTtJQUNqRixJQUFJZTtJQUVKLEtBQUssTUFBTVosU0FBU1UsT0FBUTtRQUMxQixJQUFJO1lBQ0YsTUFBTUcsV0FBVyxNQUFNVCxTQUFTTSxNQUFNLENBQUNJLGVBQWUsQ0FBQztnQkFDckRkO2dCQUNBZSxVQUFVUDtnQkFDVlEsUUFBUTtvQkFDTkMsYUFBYVIsUUFBUVEsV0FBVyxJQUFJO2dCQUN0QztZQUNGO1lBRUEsT0FBT0osU0FBU0ssSUFBSSxJQUFJO1FBQzFCLEVBQUUsT0FBT0MsT0FBTztZQUNkUCxZQUFZTztZQUNaLE1BQU1DLFNBQVMsTUFBK0JBLE1BQU07WUFDcEQsSUFBSUEsV0FBVyxPQUFPQSxXQUFXLEtBQUssTUFBTUQ7WUFDNUNFLFFBQVFDLElBQUksQ0FBQyxDQUFDLGlCQUFpQixFQUFFdEIsTUFBTSwrQkFBK0IsQ0FBQztRQUN6RTtJQUNGO0lBRUEsTUFBTVk7QUFDUiIsInNvdXJjZXMiOlsiL1VzZXJzL2FyeWFuYWdyYXdhbC9EZXNrdG9wL1Byb2plY3RzL2NoYXRseXRpY3MtRklOQUwvbGliL2dlbWluaS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHb29nbGVHZW5BSSB9IGZyb20gXCJAZ29vZ2xlL2dlbmFpXCJcblxuZXhwb3J0IGNvbnN0IEdFTUlOSV9HRU5FUkFUSU9OX01PREVMID1cbiAgcHJvY2Vzcy5lbnYuR0VNSU5JX0dFTkVSQVRJT05fTU9ERUwgfHwgXCJnZW1pbmktMi41LWZsYXNoXCJcblxuY29uc3QgR0VNSU5JX0ZBTExCQUNLX01PREVMUyA9IChcbiAgcHJvY2Vzcy5lbnYuR0VNSU5JX0ZBTExCQUNLX01PREVMUyB8fCBcImdlbWluaS0yLjUtZmxhc2gtbGl0ZVwiXG4pXG4gIC5zcGxpdChcIixcIilcbiAgLm1hcCgobW9kZWwpID0+IG1vZGVsLnRyaW0oKSlcbiAgLmZpbHRlcihCb29sZWFuKVxuXG5leHBvcnQgY29uc3QgZ2VtaW5pQUkgPSBuZXcgR29vZ2xlR2VuQUkoe1xuICBhcGlLZXk6IHByb2Nlc3MuZW52LkdFTUlOSV9BUElfS0VZISxcbn0pXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZW5lcmF0ZVRleHQoXG4gIHByb21wdDogc3RyaW5nLFxuICBvcHRpb25zOiB7IHRlbXBlcmF0dXJlPzogbnVtYmVyIH0gPSB7fVxuKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3QgbW9kZWxzID0gWy4uLm5ldyBTZXQoW0dFTUlOSV9HRU5FUkFUSU9OX01PREVMLCAuLi5HRU1JTklfRkFMTEJBQ0tfTU9ERUxTXSldXG4gIGxldCBsYXN0RXJyb3I6IHVua25vd25cblxuICBmb3IgKGNvbnN0IG1vZGVsIG9mIG1vZGVscykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGdlbWluaUFJLm1vZGVscy5nZW5lcmF0ZUNvbnRlbnQoe1xuICAgICAgICBtb2RlbCxcbiAgICAgICAgY29udGVudHM6IHByb21wdCxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgdGVtcGVyYXR1cmU6IG9wdGlvbnMudGVtcGVyYXR1cmUgPz8gMC40LFxuICAgICAgICB9LFxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlLnRleHQgfHwgXCJcIlxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsYXN0RXJyb3IgPSBlcnJvclxuICAgICAgY29uc3Qgc3RhdHVzID0gKGVycm9yIGFzIHsgc3RhdHVzPzogbnVtYmVyIH0pLnN0YXR1c1xuICAgICAgaWYgKHN0YXR1cyAhPT0gNDI5ICYmIHN0YXR1cyAhPT0gNDA0KSB0aHJvdyBlcnJvclxuICAgICAgY29uc29sZS53YXJuKGBbR0VNSU5JIFdBUk5JTkddICR7bW9kZWx9IHVuYXZhaWxhYmxlOyB0cnlpbmcgbmV4dCBtb2RlbGApXG4gICAgfVxuICB9XG5cbiAgdGhyb3cgbGFzdEVycm9yXG59XG4iXSwibmFtZXMiOlsiR29vZ2xlR2VuQUkiLCJHRU1JTklfR0VORVJBVElPTl9NT0RFTCIsInByb2Nlc3MiLCJlbnYiLCJHRU1JTklfRkFMTEJBQ0tfTU9ERUxTIiwic3BsaXQiLCJtYXAiLCJtb2RlbCIsInRyaW0iLCJmaWx0ZXIiLCJCb29sZWFuIiwiZ2VtaW5pQUkiLCJhcGlLZXkiLCJHRU1JTklfQVBJX0tFWSIsImdlbmVyYXRlVGV4dCIsInByb21wdCIsIm9wdGlvbnMiLCJtb2RlbHMiLCJTZXQiLCJsYXN0RXJyb3IiLCJyZXNwb25zZSIsImdlbmVyYXRlQ29udGVudCIsImNvbnRlbnRzIiwiY29uZmlnIiwidGVtcGVyYXR1cmUiLCJ0ZXh0IiwiZXJyb3IiLCJzdGF0dXMiLCJjb25zb2xlIiwid2FybiJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/gemini.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fbot%2Fchat%2Froute&page=%2Fapi%2Fbot%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbot%2Fchat%2Froute.ts&appDir=%2FUsers%2Faryanagrawal%2FDesktop%2FProjects%2Fchatlytics-FINAL%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Faryanagrawal%2FDesktop%2FProjects%2Fchatlytics-FINAL&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=!":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fbot%2Fchat%2Froute&page=%2Fapi%2Fbot%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbot%2Fchat%2Froute.ts&appDir=%2FUsers%2Faryanagrawal%2FDesktop%2FProjects%2Fchatlytics-FINAL%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Faryanagrawal%2FDesktop%2FProjects%2Fchatlytics-FINAL&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=! ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   handler: () => (/* binding */ handler),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/dist/server/request-meta */ \"(rsc)/./node_modules/next/dist/server/request-meta.js\");\n/* harmony import */ var next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/dist/server/lib/trace/tracer */ \"(rsc)/./node_modules/next/dist/server/lib/trace/tracer.js\");\n/* harmony import */ var next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/dist/shared/lib/router/utils/app-paths */ \"next/dist/shared/lib/router/utils/app-paths\");\n/* harmony import */ var next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/dist/server/base-http/node */ \"(rsc)/./node_modules/next/dist/server/base-http/node.js\");\n/* harmony import */ var next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/dist/server/web/spec-extension/adapters/next-request */ \"(rsc)/./node_modules/next/dist/server/web/spec-extension/adapters/next-request.js\");\n/* harmony import */ var next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/dist/server/lib/trace/constants */ \"(rsc)/./node_modules/next/dist/server/lib/trace/constants.js\");\n/* harmony import */ var next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next/dist/server/instrumentation/utils */ \"(rsc)/./node_modules/next/dist/server/instrumentation/utils.js\");\n/* harmony import */ var next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! next/dist/server/send-response */ \"(rsc)/./node_modules/next/dist/server/send-response.js\");\n/* harmony import */ var next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! next/dist/server/web/utils */ \"(rsc)/./node_modules/next/dist/server/web/utils.js\");\n/* harmony import */ var next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var next_dist_server_lib_cache_control__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! next/dist/server/lib/cache-control */ \"(rsc)/./node_modules/next/dist/server/lib/cache-control.js\");\n/* harmony import */ var next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! next/dist/lib/constants */ \"(rsc)/./node_modules/next/dist/lib/constants.js\");\n/* harmony import */ var next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! next/dist/shared/lib/no-fallback-error.external */ \"next/dist/shared/lib/no-fallback-error.external\");\n/* harmony import */ var next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! next/dist/server/response-cache */ \"(rsc)/./node_modules/next/dist/server/response-cache/index.js\");\n/* harmony import */ var next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_15__);\n/* harmony import */ var _Users_aryanagrawal_Desktop_Projects_chatlytics_FINAL_app_api_bot_chat_route_ts__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./app/api/bot/chat/route.ts */ \"(rsc)/./app/api/bot/chat/route.ts\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/bot/chat/route\",\n        pathname: \"/api/bot/chat\",\n        filename: \"route\",\n        bundlePath: \"app/api/bot/chat/route\"\n    },\n    distDir: \".next-dev\" || 0,\n    relativeProjectDir:  false || '',\n    resolvedPagePath: \"/Users/aryanagrawal/Desktop/Projects/chatlytics-FINAL/app/api/bot/chat/route.ts\",\n    nextConfigOutput,\n    userland: _Users_aryanagrawal_Desktop_Projects_chatlytics_FINAL_app_api_bot_chat_route_ts__WEBPACK_IMPORTED_MODULE_16__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\nasync function handler(req, res, ctx) {\n    var _nextConfig_experimental;\n    let srcPage = \"/api/bot/chat/route\";\n    // turbopack doesn't normalize `/index` in the page name\n    // so we need to to process dynamic routes properly\n    // TODO: fix turbopack providing differing value from webpack\n    if (false) {} else if (srcPage === '/index') {\n        // we always normalize /index specifically\n        srcPage = '/';\n    }\n    const multiZoneDraftMode = false;\n    const prepareResult = await routeModule.prepare(req, res, {\n        srcPage,\n        multiZoneDraftMode\n    });\n    if (!prepareResult) {\n        res.statusCode = 400;\n        res.end('Bad Request');\n        ctx.waitUntil == null ? void 0 : ctx.waitUntil.call(ctx, Promise.resolve());\n        return null;\n    }\n    const { buildId, params, nextConfig, isDraftMode, prerenderManifest, routerServerContext, isOnDemandRevalidate, revalidateOnlyGenerated, resolvedPathname } = prepareResult;\n    const normalizedSrcPage = (0,next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_5__.normalizeAppPath)(srcPage);\n    let isIsr = Boolean(prerenderManifest.dynamicRoutes[normalizedSrcPage] || prerenderManifest.routes[resolvedPathname]);\n    if (isIsr && !isDraftMode) {\n        const isPrerendered = Boolean(prerenderManifest.routes[resolvedPathname]);\n        const prerenderInfo = prerenderManifest.dynamicRoutes[normalizedSrcPage];\n        if (prerenderInfo) {\n            if (prerenderInfo.fallback === false && !isPrerendered) {\n                throw new next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_14__.NoFallbackError();\n            }\n        }\n    }\n    let cacheKey = null;\n    if (isIsr && !routeModule.isDev && !isDraftMode) {\n        cacheKey = resolvedPathname;\n        // ensure /index and / is normalized to one key\n        cacheKey = cacheKey === '/index' ? '/' : cacheKey;\n    }\n    const supportsDynamicResponse = // If we're in development, we always support dynamic HTML\n    routeModule.isDev === true || // If this is not SSG or does not have static paths, then it supports\n    // dynamic HTML.\n    !isIsr;\n    // This is a revalidation request if the request is for a static\n    // page and it is not being resumed from a postponed render and\n    // it is not a dynamic RSC request then it is a revalidation\n    // request.\n    const isRevalidate = isIsr && !supportsDynamicResponse;\n    const method = req.method || 'GET';\n    const tracer = (0,next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__.getTracer)();\n    const activeSpan = tracer.getActiveScopeSpan();\n    const context = {\n        params,\n        prerenderManifest,\n        renderOpts: {\n            experimental: {\n                cacheComponents: Boolean(nextConfig.experimental.cacheComponents),\n                authInterrupts: Boolean(nextConfig.experimental.authInterrupts)\n            },\n            supportsDynamicResponse,\n            incrementalCache: (0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'incrementalCache'),\n            cacheLifeProfiles: (_nextConfig_experimental = nextConfig.experimental) == null ? void 0 : _nextConfig_experimental.cacheLife,\n            isRevalidate,\n            waitUntil: ctx.waitUntil,\n            onClose: (cb)=>{\n                res.on('close', cb);\n            },\n            onAfterTaskError: undefined,\n            onInstrumentationRequestError: (error, _request, errorContext)=>routeModule.onRequestError(req, error, errorContext, routerServerContext)\n        },\n        sharedContext: {\n            buildId\n        }\n    };\n    const nodeNextReq = new next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_6__.NodeNextRequest(req);\n    const nodeNextRes = new next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_6__.NodeNextResponse(res);\n    const nextReq = next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_7__.NextRequestAdapter.fromNodeNextRequest(nodeNextReq, (0,next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_7__.signalFromNodeResponse)(res));\n    try {\n        const invokeRouteModule = async (span)=>{\n            return routeModule.handle(nextReq, context).finally(()=>{\n                if (!span) return;\n                span.setAttributes({\n                    'http.status_code': res.statusCode,\n                    'next.rsc': false\n                });\n                const rootSpanAttributes = tracer.getRootSpanAttributes();\n                // We were unable to get attributes, probably OTEL is not enabled\n                if (!rootSpanAttributes) {\n                    return;\n                }\n                if (rootSpanAttributes.get('next.span_type') !== next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_8__.BaseServerSpan.handleRequest) {\n                    console.warn(`Unexpected root span type '${rootSpanAttributes.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`);\n                    return;\n                }\n                const route = rootSpanAttributes.get('next.route');\n                if (route) {\n                    const name = `${method} ${route}`;\n                    span.setAttributes({\n                        'next.route': route,\n                        'http.route': route,\n                        'next.span_name': name\n                    });\n                    span.updateName(name);\n                } else {\n                    span.updateName(`${method} ${req.url}`);\n                }\n            });\n        };\n        const handleResponse = async (currentSpan)=>{\n            var _cacheEntry_value;\n            const responseGenerator = async ({ previousCacheEntry })=>{\n                try {\n                    if (!(0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'minimalMode') && isOnDemandRevalidate && revalidateOnlyGenerated && !previousCacheEntry) {\n                        res.statusCode = 404;\n                        // on-demand revalidate always sets this header\n                        res.setHeader('x-nextjs-cache', 'REVALIDATED');\n                        res.end('This page could not be found');\n                        return null;\n                    }\n                    const response = await invokeRouteModule(currentSpan);\n                    req.fetchMetrics = context.renderOpts.fetchMetrics;\n                    let pendingWaitUntil = context.renderOpts.pendingWaitUntil;\n                    // Attempt using provided waitUntil if available\n                    // if it's not we fallback to sendResponse's handling\n                    if (pendingWaitUntil) {\n                        if (ctx.waitUntil) {\n                            ctx.waitUntil(pendingWaitUntil);\n                            pendingWaitUntil = undefined;\n                        }\n                    }\n                    const cacheTags = context.renderOpts.collectedTags;\n                    // If the request is for a static response, we can cache it so long\n                    // as it's not edge.\n                    if (isIsr) {\n                        const blob = await response.blob();\n                        // Copy the headers from the response.\n                        const headers = (0,next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_11__.toNodeOutgoingHttpHeaders)(response.headers);\n                        if (cacheTags) {\n                            headers[next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13__.NEXT_CACHE_TAGS_HEADER] = cacheTags;\n                        }\n                        if (!headers['content-type'] && blob.type) {\n                            headers['content-type'] = blob.type;\n                        }\n                        const revalidate = typeof context.renderOpts.collectedRevalidate === 'undefined' || context.renderOpts.collectedRevalidate >= next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13__.INFINITE_CACHE ? false : context.renderOpts.collectedRevalidate;\n                        const expire = typeof context.renderOpts.collectedExpire === 'undefined' || context.renderOpts.collectedExpire >= next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13__.INFINITE_CACHE ? undefined : context.renderOpts.collectedExpire;\n                        // Create the cache entry for the response.\n                        const cacheEntry = {\n                            value: {\n                                kind: next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_15__.CachedRouteKind.APP_ROUTE,\n                                status: response.status,\n                                body: Buffer.from(await blob.arrayBuffer()),\n                                headers\n                            },\n                            cacheControl: {\n                                revalidate,\n                                expire\n                            }\n                        };\n                        return cacheEntry;\n                    } else {\n                        // send response without caching if not ISR\n                        await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_10__.sendResponse)(nodeNextReq, nodeNextRes, response, context.renderOpts.pendingWaitUntil);\n                        return null;\n                    }\n                } catch (err) {\n                    // if this is a background revalidate we need to report\n                    // the request error here as it won't be bubbled\n                    if (previousCacheEntry == null ? void 0 : previousCacheEntry.isStale) {\n                        await routeModule.onRequestError(req, err, {\n                            routerKind: 'App Router',\n                            routePath: srcPage,\n                            routeType: 'route',\n                            revalidateReason: (0,next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_9__.getRevalidateReason)({\n                                isRevalidate,\n                                isOnDemandRevalidate\n                            })\n                        }, routerServerContext);\n                    }\n                    throw err;\n                }\n            };\n            const cacheEntry = await routeModule.handleResponse({\n                req,\n                nextConfig,\n                cacheKey,\n                routeKind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n                isFallback: false,\n                prerenderManifest,\n                isRoutePPREnabled: false,\n                isOnDemandRevalidate,\n                revalidateOnlyGenerated,\n                responseGenerator,\n                waitUntil: ctx.waitUntil\n            });\n            // we don't create a cacheEntry for ISR\n            if (!isIsr) {\n                return null;\n            }\n            if ((cacheEntry == null ? void 0 : (_cacheEntry_value = cacheEntry.value) == null ? void 0 : _cacheEntry_value.kind) !== next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_15__.CachedRouteKind.APP_ROUTE) {\n                var _cacheEntry_value1;\n                throw Object.defineProperty(new Error(`Invariant: app-route received invalid cache entry ${cacheEntry == null ? void 0 : (_cacheEntry_value1 = cacheEntry.value) == null ? void 0 : _cacheEntry_value1.kind}`), \"__NEXT_ERROR_CODE\", {\n                    value: \"E701\",\n                    enumerable: false,\n                    configurable: true\n                });\n            }\n            if (!(0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'minimalMode')) {\n                res.setHeader('x-nextjs-cache', isOnDemandRevalidate ? 'REVALIDATED' : cacheEntry.isMiss ? 'MISS' : cacheEntry.isStale ? 'STALE' : 'HIT');\n            }\n            // Draft mode should never be cached\n            if (isDraftMode) {\n                res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');\n            }\n            const headers = (0,next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_11__.fromNodeOutgoingHttpHeaders)(cacheEntry.value.headers);\n            if (!((0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'minimalMode') && isIsr)) {\n                headers.delete(next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13__.NEXT_CACHE_TAGS_HEADER);\n            }\n            // If cache control is already set on the response we don't\n            // override it to allow users to customize it via next.config\n            if (cacheEntry.cacheControl && !res.getHeader('Cache-Control') && !headers.get('Cache-Control')) {\n                headers.set('Cache-Control', (0,next_dist_server_lib_cache_control__WEBPACK_IMPORTED_MODULE_12__.getCacheControlHeader)(cacheEntry.cacheControl));\n            }\n            await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_10__.sendResponse)(nodeNextReq, nodeNextRes, new Response(cacheEntry.value.body, {\n                headers,\n                status: cacheEntry.value.status || 200\n            }));\n            return null;\n        };\n        // TODO: activeSpan code path is for when wrapped by\n        // next-server can be removed when this is no longer used\n        if (activeSpan) {\n            await handleResponse(activeSpan);\n        } else {\n            await tracer.withPropagatedContext(req.headers, ()=>tracer.trace(next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_8__.BaseServerSpan.handleRequest, {\n                    spanName: `${method} ${req.url}`,\n                    kind: next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__.SpanKind.SERVER,\n                    attributes: {\n                        'http.method': method,\n                        'http.target': req.url\n                    }\n                }, handleResponse));\n        }\n    } catch (err) {\n        if (!(err instanceof next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_14__.NoFallbackError)) {\n            await routeModule.onRequestError(req, err, {\n                routerKind: 'App Router',\n                routePath: normalizedSrcPage,\n                routeType: 'route',\n                revalidateReason: (0,next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_9__.getRevalidateReason)({\n                    isRevalidate,\n                    isOnDemandRevalidate\n                })\n            });\n        }\n        // rethrow so that we can handle serving error page\n        // If this is during static generation, throw the error again.\n        if (isIsr) throw err;\n        // Otherwise, send a 500 response.\n        await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_10__.sendResponse)(nodeNextReq, nodeNextRes, new Response(null, {\n            status: 500\n        }));\n        return null;\n    }\n}\n\n//# sourceMappingURL=app-route.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZib3QlMkZjaGF0JTJGcm91dGUmcGFnZT0lMkZhcGklMkZib3QlMkZjaGF0JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYm90JTJGY2hhdCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmFyeWFuYWdyYXdhbCUyRkRlc2t0b3AlMkZQcm9qZWN0cyUyRmNoYXRseXRpY3MtRklOQUwlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGYXJ5YW5hZ3Jhd2FsJTJGRGVza3RvcCUyRlByb2plY3RzJTJGY2hhdGx5dGljcy1GSU5BTCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCZpc0dsb2JhbE5vdEZvdW5kRW5hYmxlZD0hIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ2Q7QUFDUztBQUNPO0FBQ0s7QUFDbUM7QUFDakQ7QUFDTztBQUNmO0FBQ3NDO0FBQ3pCO0FBQ007QUFDQztBQUNoQjtBQUMwQztBQUM1RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxhQUFhLFdBQW9DLElBQUksQ0FBRTtBQUN2RCx3QkFBd0IsTUFBdUM7QUFDL0Q7QUFDQTtBQUNB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QUNsRTtBQUNBLGtCQUFrQiw2RUFBWTtBQUM5QjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDViw2RUFBNkUsZ0ZBQWM7QUFDM0YsaUNBQWlDLFFBQVEsRUFBRSxRQUFRO0FBQ25ELDBCQUEwQix1RUFBUTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLE1BQU07QUFDTiw2QkFBNkIsNkZBQWU7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsMkZBQW1CO0FBQ3JEO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDZFQUFZO0FBQzFCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCB7IGdldFJlcXVlc3RNZXRhIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcmVxdWVzdC1tZXRhXCI7XG5pbXBvcnQgeyBnZXRUcmFjZXIsIFNwYW5LaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3RyYWNlL3RyYWNlclwiO1xuaW1wb3J0IHsgbm9ybWFsaXplQXBwUGF0aCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9yb3V0ZXIvdXRpbHMvYXBwLXBhdGhzXCI7XG5pbXBvcnQgeyBOb2RlTmV4dFJlcXVlc3QsIE5vZGVOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9iYXNlLWh0dHAvbm9kZVwiO1xuaW1wb3J0IHsgTmV4dFJlcXVlc3RBZGFwdGVyLCBzaWduYWxGcm9tTm9kZVJlc3BvbnNlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvd2ViL3NwZWMtZXh0ZW5zaW9uL2FkYXB0ZXJzL25leHQtcmVxdWVzdFwiO1xuaW1wb3J0IHsgQmFzZVNlcnZlclNwYW4gfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvdHJhY2UvY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBnZXRSZXZhbGlkYXRlUmVhc29uIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvaW5zdHJ1bWVudGF0aW9uL3V0aWxzXCI7XG5pbXBvcnQgeyBzZW5kUmVzcG9uc2UgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9zZW5kLXJlc3BvbnNlXCI7XG5pbXBvcnQgeyBmcm9tTm9kZU91dGdvaW5nSHR0cEhlYWRlcnMsIHRvTm9kZU91dGdvaW5nSHR0cEhlYWRlcnMgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci93ZWIvdXRpbHNcIjtcbmltcG9ydCB7IGdldENhY2hlQ29udHJvbEhlYWRlciB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9jYWNoZS1jb250cm9sXCI7XG5pbXBvcnQgeyBJTkZJTklURV9DQUNIRSwgTkVYVF9DQUNIRV9UQUdTX0hFQURFUiB9IGZyb20gXCJuZXh0L2Rpc3QvbGliL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgTm9GYWxsYmFja0Vycm9yIH0gZnJvbSBcIm5leHQvZGlzdC9zaGFyZWQvbGliL25vLWZhbGxiYWNrLWVycm9yLmV4dGVybmFsXCI7XG5pbXBvcnQgeyBDYWNoZWRSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yZXNwb25zZS1jYWNoZVwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy9hcnlhbmFncmF3YWwvRGVza3RvcC9Qcm9qZWN0cy9jaGF0bHl0aWNzLUZJTkFML2FwcC9hcGkvYm90L2NoYXQvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2JvdC9jaGF0L3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYm90L2NoYXRcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2JvdC9jaGF0L3JvdXRlXCJcbiAgICB9LFxuICAgIGRpc3REaXI6IHByb2Nlc3MuZW52Ll9fTkVYVF9SRUxBVElWRV9ESVNUX0RJUiB8fCAnJyxcbiAgICByZWxhdGl2ZVByb2plY3REaXI6IHByb2Nlc3MuZW52Ll9fTkVYVF9SRUxBVElWRV9QUk9KRUNUX0RJUiB8fCAnJyxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9hcnlhbmFncmF3YWwvRGVza3RvcC9Qcm9qZWN0cy9jaGF0bHl0aWNzLUZJTkFML2FwcC9hcGkvYm90L2NoYXQvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihyZXEsIHJlcywgY3R4KSB7XG4gICAgdmFyIF9uZXh0Q29uZmlnX2V4cGVyaW1lbnRhbDtcbiAgICBsZXQgc3JjUGFnZSA9IFwiL2FwaS9ib3QvY2hhdC9yb3V0ZVwiO1xuICAgIC8vIHR1cmJvcGFjayBkb2Vzbid0IG5vcm1hbGl6ZSBgL2luZGV4YCBpbiB0aGUgcGFnZSBuYW1lXG4gICAgLy8gc28gd2UgbmVlZCB0byB0byBwcm9jZXNzIGR5bmFtaWMgcm91dGVzIHByb3Blcmx5XG4gICAgLy8gVE9ETzogZml4IHR1cmJvcGFjayBwcm92aWRpbmcgZGlmZmVyaW5nIHZhbHVlIGZyb20gd2VicGFja1xuICAgIGlmIChwcm9jZXNzLmVudi5UVVJCT1BBQ0spIHtcbiAgICAgICAgc3JjUGFnZSA9IHNyY1BhZ2UucmVwbGFjZSgvXFwvaW5kZXgkLywgJycpIHx8ICcvJztcbiAgICB9IGVsc2UgaWYgKHNyY1BhZ2UgPT09ICcvaW5kZXgnKSB7XG4gICAgICAgIC8vIHdlIGFsd2F5cyBub3JtYWxpemUgL2luZGV4IHNwZWNpZmljYWxseVxuICAgICAgICBzcmNQYWdlID0gJy8nO1xuICAgIH1cbiAgICBjb25zdCBtdWx0aVpvbmVEcmFmdE1vZGUgPSBwcm9jZXNzLmVudi5fX05FWFRfTVVMVElfWk9ORV9EUkFGVF9NT0RFO1xuICAgIGNvbnN0IHByZXBhcmVSZXN1bHQgPSBhd2FpdCByb3V0ZU1vZHVsZS5wcmVwYXJlKHJlcSwgcmVzLCB7XG4gICAgICAgIHNyY1BhZ2UsXG4gICAgICAgIG11bHRpWm9uZURyYWZ0TW9kZVxuICAgIH0pO1xuICAgIGlmICghcHJlcGFyZVJlc3VsdCkge1xuICAgICAgICByZXMuc3RhdHVzQ29kZSA9IDQwMDtcbiAgICAgICAgcmVzLmVuZCgnQmFkIFJlcXVlc3QnKTtcbiAgICAgICAgY3R4LndhaXRVbnRpbCA9PSBudWxsID8gdm9pZCAwIDogY3R4LndhaXRVbnRpbC5jYWxsKGN0eCwgUHJvbWlzZS5yZXNvbHZlKCkpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgeyBidWlsZElkLCBwYXJhbXMsIG5leHRDb25maWcsIGlzRHJhZnRNb2RlLCBwcmVyZW5kZXJNYW5pZmVzdCwgcm91dGVyU2VydmVyQ29udGV4dCwgaXNPbkRlbWFuZFJldmFsaWRhdGUsIHJldmFsaWRhdGVPbmx5R2VuZXJhdGVkLCByZXNvbHZlZFBhdGhuYW1lIH0gPSBwcmVwYXJlUmVzdWx0O1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRTcmNQYWdlID0gbm9ybWFsaXplQXBwUGF0aChzcmNQYWdlKTtcbiAgICBsZXQgaXNJc3IgPSBCb29sZWFuKHByZXJlbmRlck1hbmlmZXN0LmR5bmFtaWNSb3V0ZXNbbm9ybWFsaXplZFNyY1BhZ2VdIHx8IHByZXJlbmRlck1hbmlmZXN0LnJvdXRlc1tyZXNvbHZlZFBhdGhuYW1lXSk7XG4gICAgaWYgKGlzSXNyICYmICFpc0RyYWZ0TW9kZSkge1xuICAgICAgICBjb25zdCBpc1ByZXJlbmRlcmVkID0gQm9vbGVhbihwcmVyZW5kZXJNYW5pZmVzdC5yb3V0ZXNbcmVzb2x2ZWRQYXRobmFtZV0pO1xuICAgICAgICBjb25zdCBwcmVyZW5kZXJJbmZvID0gcHJlcmVuZGVyTWFuaWZlc3QuZHluYW1pY1JvdXRlc1tub3JtYWxpemVkU3JjUGFnZV07XG4gICAgICAgIGlmIChwcmVyZW5kZXJJbmZvKSB7XG4gICAgICAgICAgICBpZiAocHJlcmVuZGVySW5mby5mYWxsYmFjayA9PT0gZmFsc2UgJiYgIWlzUHJlcmVuZGVyZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTm9GYWxsYmFja0Vycm9yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IGNhY2hlS2V5ID0gbnVsbDtcbiAgICBpZiAoaXNJc3IgJiYgIXJvdXRlTW9kdWxlLmlzRGV2ICYmICFpc0RyYWZ0TW9kZSkge1xuICAgICAgICBjYWNoZUtleSA9IHJlc29sdmVkUGF0aG5hbWU7XG4gICAgICAgIC8vIGVuc3VyZSAvaW5kZXggYW5kIC8gaXMgbm9ybWFsaXplZCB0byBvbmUga2V5XG4gICAgICAgIGNhY2hlS2V5ID0gY2FjaGVLZXkgPT09ICcvaW5kZXgnID8gJy8nIDogY2FjaGVLZXk7XG4gICAgfVxuICAgIGNvbnN0IHN1cHBvcnRzRHluYW1pY1Jlc3BvbnNlID0gLy8gSWYgd2UncmUgaW4gZGV2ZWxvcG1lbnQsIHdlIGFsd2F5cyBzdXBwb3J0IGR5bmFtaWMgSFRNTFxuICAgIHJvdXRlTW9kdWxlLmlzRGV2ID09PSB0cnVlIHx8IC8vIElmIHRoaXMgaXMgbm90IFNTRyBvciBkb2VzIG5vdCBoYXZlIHN0YXRpYyBwYXRocywgdGhlbiBpdCBzdXBwb3J0c1xuICAgIC8vIGR5bmFtaWMgSFRNTC5cbiAgICAhaXNJc3I7XG4gICAgLy8gVGhpcyBpcyBhIHJldmFsaWRhdGlvbiByZXF1ZXN0IGlmIHRoZSByZXF1ZXN0IGlzIGZvciBhIHN0YXRpY1xuICAgIC8vIHBhZ2UgYW5kIGl0IGlzIG5vdCBiZWluZyByZXN1bWVkIGZyb20gYSBwb3N0cG9uZWQgcmVuZGVyIGFuZFxuICAgIC8vIGl0IGlzIG5vdCBhIGR5bmFtaWMgUlNDIHJlcXVlc3QgdGhlbiBpdCBpcyBhIHJldmFsaWRhdGlvblxuICAgIC8vIHJlcXVlc3QuXG4gICAgY29uc3QgaXNSZXZhbGlkYXRlID0gaXNJc3IgJiYgIXN1cHBvcnRzRHluYW1pY1Jlc3BvbnNlO1xuICAgIGNvbnN0IG1ldGhvZCA9IHJlcS5tZXRob2QgfHwgJ0dFVCc7XG4gICAgY29uc3QgdHJhY2VyID0gZ2V0VHJhY2VyKCk7XG4gICAgY29uc3QgYWN0aXZlU3BhbiA9IHRyYWNlci5nZXRBY3RpdmVTY29wZVNwYW4oKTtcbiAgICBjb25zdCBjb250ZXh0ID0ge1xuICAgICAgICBwYXJhbXMsXG4gICAgICAgIHByZXJlbmRlck1hbmlmZXN0LFxuICAgICAgICByZW5kZXJPcHRzOiB7XG4gICAgICAgICAgICBleHBlcmltZW50YWw6IHtcbiAgICAgICAgICAgICAgICBjYWNoZUNvbXBvbmVudHM6IEJvb2xlYW4obmV4dENvbmZpZy5leHBlcmltZW50YWwuY2FjaGVDb21wb25lbnRzKSxcbiAgICAgICAgICAgICAgICBhdXRoSW50ZXJydXB0czogQm9vbGVhbihuZXh0Q29uZmlnLmV4cGVyaW1lbnRhbC5hdXRoSW50ZXJydXB0cylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdXBwb3J0c0R5bmFtaWNSZXNwb25zZSxcbiAgICAgICAgICAgIGluY3JlbWVudGFsQ2FjaGU6IGdldFJlcXVlc3RNZXRhKHJlcSwgJ2luY3JlbWVudGFsQ2FjaGUnKSxcbiAgICAgICAgICAgIGNhY2hlTGlmZVByb2ZpbGVzOiAoX25leHRDb25maWdfZXhwZXJpbWVudGFsID0gbmV4dENvbmZpZy5leHBlcmltZW50YWwpID09IG51bGwgPyB2b2lkIDAgOiBfbmV4dENvbmZpZ19leHBlcmltZW50YWwuY2FjaGVMaWZlLFxuICAgICAgICAgICAgaXNSZXZhbGlkYXRlLFxuICAgICAgICAgICAgd2FpdFVudGlsOiBjdHgud2FpdFVudGlsLFxuICAgICAgICAgICAgb25DbG9zZTogKGNiKT0+e1xuICAgICAgICAgICAgICAgIHJlcy5vbignY2xvc2UnLCBjYik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25BZnRlclRhc2tFcnJvcjogdW5kZWZpbmVkLFxuICAgICAgICAgICAgb25JbnN0cnVtZW50YXRpb25SZXF1ZXN0RXJyb3I6IChlcnJvciwgX3JlcXVlc3QsIGVycm9yQ29udGV4dCk9PnJvdXRlTW9kdWxlLm9uUmVxdWVzdEVycm9yKHJlcSwgZXJyb3IsIGVycm9yQ29udGV4dCwgcm91dGVyU2VydmVyQ29udGV4dClcbiAgICAgICAgfSxcbiAgICAgICAgc2hhcmVkQ29udGV4dDoge1xuICAgICAgICAgICAgYnVpbGRJZFxuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBub2RlTmV4dFJlcSA9IG5ldyBOb2RlTmV4dFJlcXVlc3QocmVxKTtcbiAgICBjb25zdCBub2RlTmV4dFJlcyA9IG5ldyBOb2RlTmV4dFJlc3BvbnNlKHJlcyk7XG4gICAgY29uc3QgbmV4dFJlcSA9IE5leHRSZXF1ZXN0QWRhcHRlci5mcm9tTm9kZU5leHRSZXF1ZXN0KG5vZGVOZXh0UmVxLCBzaWduYWxGcm9tTm9kZVJlc3BvbnNlKHJlcykpO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGludm9rZVJvdXRlTW9kdWxlID0gYXN5bmMgKHNwYW4pPT57XG4gICAgICAgICAgICByZXR1cm4gcm91dGVNb2R1bGUuaGFuZGxlKG5leHRSZXEsIGNvbnRleHQpLmZpbmFsbHkoKCk9PntcbiAgICAgICAgICAgICAgICBpZiAoIXNwYW4pIHJldHVybjtcbiAgICAgICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZXMoe1xuICAgICAgICAgICAgICAgICAgICAnaHR0cC5zdGF0dXNfY29kZSc6IHJlcy5zdGF0dXNDb2RlLFxuICAgICAgICAgICAgICAgICAgICAnbmV4dC5yc2MnOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvb3RTcGFuQXR0cmlidXRlcyA9IHRyYWNlci5nZXRSb290U3BhbkF0dHJpYnV0ZXMoKTtcbiAgICAgICAgICAgICAgICAvLyBXZSB3ZXJlIHVuYWJsZSB0byBnZXQgYXR0cmlidXRlcywgcHJvYmFibHkgT1RFTCBpcyBub3QgZW5hYmxlZFxuICAgICAgICAgICAgICAgIGlmICghcm9vdFNwYW5BdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJvb3RTcGFuQXR0cmlidXRlcy5nZXQoJ25leHQuc3Bhbl90eXBlJykgIT09IEJhc2VTZXJ2ZXJTcGFuLmhhbmRsZVJlcXVlc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBVbmV4cGVjdGVkIHJvb3Qgc3BhbiB0eXBlICcke3Jvb3RTcGFuQXR0cmlidXRlcy5nZXQoJ25leHQuc3Bhbl90eXBlJyl9Jy4gUGxlYXNlIHJlcG9ydCB0aGlzIE5leHQuanMgaXNzdWUgaHR0cHM6Ly9naXRodWIuY29tL3ZlcmNlbC9uZXh0LmpzYCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qgcm91dGUgPSByb290U3BhbkF0dHJpYnV0ZXMuZ2V0KCduZXh0LnJvdXRlJyk7XG4gICAgICAgICAgICAgICAgaWYgKHJvdXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBgJHttZXRob2R9ICR7cm91dGV9YDtcbiAgICAgICAgICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGVzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICduZXh0LnJvdXRlJzogcm91dGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAnaHR0cC5yb3V0ZSc6IHJvdXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ25leHQuc3Bhbl9uYW1lJzogbmFtZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc3Bhbi51cGRhdGVOYW1lKG5hbWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNwYW4udXBkYXRlTmFtZShgJHttZXRob2R9ICR7cmVxLnVybH1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgaGFuZGxlUmVzcG9uc2UgPSBhc3luYyAoY3VycmVudFNwYW4pPT57XG4gICAgICAgICAgICB2YXIgX2NhY2hlRW50cnlfdmFsdWU7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZUdlbmVyYXRvciA9IGFzeW5jICh7IHByZXZpb3VzQ2FjaGVFbnRyeSB9KT0+e1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZ2V0UmVxdWVzdE1ldGEocmVxLCAnbWluaW1hbE1vZGUnKSAmJiBpc09uRGVtYW5kUmV2YWxpZGF0ZSAmJiByZXZhbGlkYXRlT25seUdlbmVyYXRlZCAmJiAhcHJldmlvdXNDYWNoZUVudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzQ29kZSA9IDQwNDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9uLWRlbWFuZCByZXZhbGlkYXRlIGFsd2F5cyBzZXRzIHRoaXMgaGVhZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuc2V0SGVhZGVyKCd4LW5leHRqcy1jYWNoZScsICdSRVZBTElEQVRFRCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLmVuZCgnVGhpcyBwYWdlIGNvdWxkIG5vdCBiZSBmb3VuZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBpbnZva2VSb3V0ZU1vZHVsZShjdXJyZW50U3Bhbik7XG4gICAgICAgICAgICAgICAgICAgIHJlcS5mZXRjaE1ldHJpY3MgPSBjb250ZXh0LnJlbmRlck9wdHMuZmV0Y2hNZXRyaWNzO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGVuZGluZ1dhaXRVbnRpbCA9IGNvbnRleHQucmVuZGVyT3B0cy5wZW5kaW5nV2FpdFVudGlsO1xuICAgICAgICAgICAgICAgICAgICAvLyBBdHRlbXB0IHVzaW5nIHByb3ZpZGVkIHdhaXRVbnRpbCBpZiBhdmFpbGFibGVcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgaXQncyBub3Qgd2UgZmFsbGJhY2sgdG8gc2VuZFJlc3BvbnNlJ3MgaGFuZGxpbmdcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBlbmRpbmdXYWl0VW50aWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHgud2FpdFVudGlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3R4LndhaXRVbnRpbChwZW5kaW5nV2FpdFVudGlsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZW5kaW5nV2FpdFVudGlsID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhY2hlVGFncyA9IGNvbnRleHQucmVuZGVyT3B0cy5jb2xsZWN0ZWRUYWdzO1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgcmVxdWVzdCBpcyBmb3IgYSBzdGF0aWMgcmVzcG9uc2UsIHdlIGNhbiBjYWNoZSBpdCBzbyBsb25nXG4gICAgICAgICAgICAgICAgICAgIC8vIGFzIGl0J3Mgbm90IGVkZ2UuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0lzcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmxvYiA9IGF3YWl0IHJlc3BvbnNlLmJsb2IoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENvcHkgdGhlIGhlYWRlcnMgZnJvbSB0aGUgcmVzcG9uc2UuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJzID0gdG9Ob2RlT3V0Z29pbmdIdHRwSGVhZGVycyhyZXNwb25zZS5oZWFkZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYWNoZVRhZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzW05FWFRfQ0FDSEVfVEFHU19IRUFERVJdID0gY2FjaGVUYWdzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFoZWFkZXJzWydjb250ZW50LXR5cGUnXSAmJiBibG9iLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzWydjb250ZW50LXR5cGUnXSA9IGJsb2IudHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJldmFsaWRhdGUgPSB0eXBlb2YgY29udGV4dC5yZW5kZXJPcHRzLmNvbGxlY3RlZFJldmFsaWRhdGUgPT09ICd1bmRlZmluZWQnIHx8IGNvbnRleHQucmVuZGVyT3B0cy5jb2xsZWN0ZWRSZXZhbGlkYXRlID49IElORklOSVRFX0NBQ0hFID8gZmFsc2UgOiBjb250ZXh0LnJlbmRlck9wdHMuY29sbGVjdGVkUmV2YWxpZGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4cGlyZSA9IHR5cGVvZiBjb250ZXh0LnJlbmRlck9wdHMuY29sbGVjdGVkRXhwaXJlID09PSAndW5kZWZpbmVkJyB8fCBjb250ZXh0LnJlbmRlck9wdHMuY29sbGVjdGVkRXhwaXJlID49IElORklOSVRFX0NBQ0hFID8gdW5kZWZpbmVkIDogY29udGV4dC5yZW5kZXJPcHRzLmNvbGxlY3RlZEV4cGlyZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgY2FjaGUgZW50cnkgZm9yIHRoZSByZXNwb25zZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhY2hlRW50cnkgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2luZDogQ2FjaGVkUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IEJ1ZmZlci5mcm9tKGF3YWl0IGJsb2IuYXJyYXlCdWZmZXIoKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlQ29udHJvbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZhbGlkYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBpcmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhY2hlRW50cnk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzZW5kIHJlc3BvbnNlIHdpdGhvdXQgY2FjaGluZyBpZiBub3QgSVNSXG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBzZW5kUmVzcG9uc2Uobm9kZU5leHRSZXEsIG5vZGVOZXh0UmVzLCByZXNwb25zZSwgY29udGV4dC5yZW5kZXJPcHRzLnBlbmRpbmdXYWl0VW50aWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhpcyBpcyBhIGJhY2tncm91bmQgcmV2YWxpZGF0ZSB3ZSBuZWVkIHRvIHJlcG9ydFxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgcmVxdWVzdCBlcnJvciBoZXJlIGFzIGl0IHdvbid0IGJlIGJ1YmJsZWRcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzQ2FjaGVFbnRyeSA9PSBudWxsID8gdm9pZCAwIDogcHJldmlvdXNDYWNoZUVudHJ5LmlzU3RhbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHJvdXRlTW9kdWxlLm9uUmVxdWVzdEVycm9yKHJlcSwgZXJyLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm91dGVyS2luZDogJ0FwcCBSb3V0ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlUGF0aDogc3JjUGFnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3V0ZVR5cGU6ICdyb3V0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2YWxpZGF0ZVJlYXNvbjogZ2V0UmV2YWxpZGF0ZVJlYXNvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUmV2YWxpZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNPbkRlbWFuZFJldmFsaWRhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgcm91dGVyU2VydmVyQ29udGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBjYWNoZUVudHJ5ID0gYXdhaXQgcm91dGVNb2R1bGUuaGFuZGxlUmVzcG9uc2Uoe1xuICAgICAgICAgICAgICAgIHJlcSxcbiAgICAgICAgICAgICAgICBuZXh0Q29uZmlnLFxuICAgICAgICAgICAgICAgIGNhY2hlS2V5LFxuICAgICAgICAgICAgICAgIHJvdXRlS2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgICAgICAgICBpc0ZhbGxiYWNrOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBwcmVyZW5kZXJNYW5pZmVzdCxcbiAgICAgICAgICAgICAgICBpc1JvdXRlUFBSRW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgaXNPbkRlbWFuZFJldmFsaWRhdGUsXG4gICAgICAgICAgICAgICAgcmV2YWxpZGF0ZU9ubHlHZW5lcmF0ZWQsXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VHZW5lcmF0b3IsXG4gICAgICAgICAgICAgICAgd2FpdFVudGlsOiBjdHgud2FpdFVudGlsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIHdlIGRvbid0IGNyZWF0ZSBhIGNhY2hlRW50cnkgZm9yIElTUlxuICAgICAgICAgICAgaWYgKCFpc0lzcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChjYWNoZUVudHJ5ID09IG51bGwgPyB2b2lkIDAgOiAoX2NhY2hlRW50cnlfdmFsdWUgPSBjYWNoZUVudHJ5LnZhbHVlKSA9PSBudWxsID8gdm9pZCAwIDogX2NhY2hlRW50cnlfdmFsdWUua2luZCkgIT09IENhY2hlZFJvdXRlS2luZC5BUFBfUk9VVEUpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2NhY2hlRW50cnlfdmFsdWUxO1xuICAgICAgICAgICAgICAgIHRocm93IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuZXcgRXJyb3IoYEludmFyaWFudDogYXBwLXJvdXRlIHJlY2VpdmVkIGludmFsaWQgY2FjaGUgZW50cnkgJHtjYWNoZUVudHJ5ID09IG51bGwgPyB2b2lkIDAgOiAoX2NhY2hlRW50cnlfdmFsdWUxID0gY2FjaGVFbnRyeS52YWx1ZSkgPT0gbnVsbCA/IHZvaWQgMCA6IF9jYWNoZUVudHJ5X3ZhbHVlMS5raW5kfWApLCBcIl9fTkVYVF9FUlJPUl9DT0RFXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiRTcwMVwiLFxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWdldFJlcXVlc3RNZXRhKHJlcSwgJ21pbmltYWxNb2RlJykpIHtcbiAgICAgICAgICAgICAgICByZXMuc2V0SGVhZGVyKCd4LW5leHRqcy1jYWNoZScsIGlzT25EZW1hbmRSZXZhbGlkYXRlID8gJ1JFVkFMSURBVEVEJyA6IGNhY2hlRW50cnkuaXNNaXNzID8gJ01JU1MnIDogY2FjaGVFbnRyeS5pc1N0YWxlID8gJ1NUQUxFJyA6ICdISVQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIERyYWZ0IG1vZGUgc2hvdWxkIG5ldmVyIGJlIGNhY2hlZFxuICAgICAgICAgICAgaWYgKGlzRHJhZnRNb2RlKSB7XG4gICAgICAgICAgICAgICAgcmVzLnNldEhlYWRlcignQ2FjaGUtQ29udHJvbCcsICdwcml2YXRlLCBuby1jYWNoZSwgbm8tc3RvcmUsIG1heC1hZ2U9MCwgbXVzdC1yZXZhbGlkYXRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBoZWFkZXJzID0gZnJvbU5vZGVPdXRnb2luZ0h0dHBIZWFkZXJzKGNhY2hlRW50cnkudmFsdWUuaGVhZGVycyk7XG4gICAgICAgICAgICBpZiAoIShnZXRSZXF1ZXN0TWV0YShyZXEsICdtaW5pbWFsTW9kZScpICYmIGlzSXNyKSkge1xuICAgICAgICAgICAgICAgIGhlYWRlcnMuZGVsZXRlKE5FWFRfQ0FDSEVfVEFHU19IRUFERVIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgY2FjaGUgY29udHJvbCBpcyBhbHJlYWR5IHNldCBvbiB0aGUgcmVzcG9uc2Ugd2UgZG9uJ3RcbiAgICAgICAgICAgIC8vIG92ZXJyaWRlIGl0IHRvIGFsbG93IHVzZXJzIHRvIGN1c3RvbWl6ZSBpdCB2aWEgbmV4dC5jb25maWdcbiAgICAgICAgICAgIGlmIChjYWNoZUVudHJ5LmNhY2hlQ29udHJvbCAmJiAhcmVzLmdldEhlYWRlcignQ2FjaGUtQ29udHJvbCcpICYmICFoZWFkZXJzLmdldCgnQ2FjaGUtQ29udHJvbCcpKSB7XG4gICAgICAgICAgICAgICAgaGVhZGVycy5zZXQoJ0NhY2hlLUNvbnRyb2wnLCBnZXRDYWNoZUNvbnRyb2xIZWFkZXIoY2FjaGVFbnRyeS5jYWNoZUNvbnRyb2wpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF3YWl0IHNlbmRSZXNwb25zZShub2RlTmV4dFJlcSwgbm9kZU5leHRSZXMsIG5ldyBSZXNwb25zZShjYWNoZUVudHJ5LnZhbHVlLmJvZHksIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICAgICAgICAgIHN0YXR1czogY2FjaGVFbnRyeS52YWx1ZS5zdGF0dXMgfHwgMjAwXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gVE9ETzogYWN0aXZlU3BhbiBjb2RlIHBhdGggaXMgZm9yIHdoZW4gd3JhcHBlZCBieVxuICAgICAgICAvLyBuZXh0LXNlcnZlciBjYW4gYmUgcmVtb3ZlZCB3aGVuIHRoaXMgaXMgbm8gbG9uZ2VyIHVzZWRcbiAgICAgICAgaWYgKGFjdGl2ZVNwYW4pIHtcbiAgICAgICAgICAgIGF3YWl0IGhhbmRsZVJlc3BvbnNlKGFjdGl2ZVNwYW4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXdhaXQgdHJhY2VyLndpdGhQcm9wYWdhdGVkQ29udGV4dChyZXEuaGVhZGVycywgKCk9PnRyYWNlci50cmFjZShCYXNlU2VydmVyU3Bhbi5oYW5kbGVSZXF1ZXN0LCB7XG4gICAgICAgICAgICAgICAgICAgIHNwYW5OYW1lOiBgJHttZXRob2R9ICR7cmVxLnVybH1gLFxuICAgICAgICAgICAgICAgICAgICBraW5kOiBTcGFuS2luZC5TRVJWRVIsXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdodHRwLm1ldGhvZCc6IG1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICdodHRwLnRhcmdldCc6IHJlcS51cmxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIGhhbmRsZVJlc3BvbnNlKSk7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgaWYgKCEoZXJyIGluc3RhbmNlb2YgTm9GYWxsYmFja0Vycm9yKSkge1xuICAgICAgICAgICAgYXdhaXQgcm91dGVNb2R1bGUub25SZXF1ZXN0RXJyb3IocmVxLCBlcnIsIHtcbiAgICAgICAgICAgICAgICByb3V0ZXJLaW5kOiAnQXBwIFJvdXRlcicsXG4gICAgICAgICAgICAgICAgcm91dGVQYXRoOiBub3JtYWxpemVkU3JjUGFnZSxcbiAgICAgICAgICAgICAgICByb3V0ZVR5cGU6ICdyb3V0ZScsXG4gICAgICAgICAgICAgICAgcmV2YWxpZGF0ZVJlYXNvbjogZ2V0UmV2YWxpZGF0ZVJlYXNvbih7XG4gICAgICAgICAgICAgICAgICAgIGlzUmV2YWxpZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgaXNPbkRlbWFuZFJldmFsaWRhdGVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmV0aHJvdyBzbyB0aGF0IHdlIGNhbiBoYW5kbGUgc2VydmluZyBlcnJvciBwYWdlXG4gICAgICAgIC8vIElmIHRoaXMgaXMgZHVyaW5nIHN0YXRpYyBnZW5lcmF0aW9uLCB0aHJvdyB0aGUgZXJyb3IgYWdhaW4uXG4gICAgICAgIGlmIChpc0lzcikgdGhyb3cgZXJyO1xuICAgICAgICAvLyBPdGhlcndpc2UsIHNlbmQgYSA1MDAgcmVzcG9uc2UuXG4gICAgICAgIGF3YWl0IHNlbmRSZXNwb25zZShub2RlTmV4dFJlcSwgbm9kZU5leHRSZXMsIG5ldyBSZXNwb25zZShudWxsLCB7XG4gICAgICAgICAgICBzdGF0dXM6IDUwMFxuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcFxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fbot%2Fchat%2Froute&page=%2Fapi%2Fbot%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbot%2Fchat%2Froute.ts&appDir=%2FUsers%2Faryanagrawal%2FDesktop%2FProjects%2Fchatlytics-FINAL%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Faryanagrawal%2FDesktop%2FProjects%2Fchatlytics-FINAL&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/google-auth-library","vendor-chunks/ws","vendor-chunks/gaxios","vendor-chunks/jws","vendor-chunks/retry","vendor-chunks/json-bigint","vendor-chunks/google-logging-utils","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/@google","vendor-chunks/safe-buffer","vendor-chunks/p-retry","vendor-chunks/jwa","vendor-chunks/extend","vendor-chunks/buffer-equal-constant-time","vendor-chunks/bignumber.js","vendor-chunks/base64-js"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fbot%2Fchat%2Froute&page=%2Fapi%2Fbot%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbot%2Fchat%2Froute.ts&appDir=%2FUsers%2Faryanagrawal%2FDesktop%2FProjects%2Fchatlytics-FINAL%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Faryanagrawal%2FDesktop%2FProjects%2Fchatlytics-FINAL&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=!")));
module.exports = __webpack_exports__;

})();