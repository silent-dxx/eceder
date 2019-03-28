#include <node.h>
#include <node_buffer.h>
#include <v8.h>
#include <windows.h>
#include <stdio.h>
#include <iostream>

using namespace std;
using namespace node;
using namespace v8;

void Call_SetDesktop()
{
	HWND hwnd_Parent = FindWindow("Progman", "Program Manager");
	//printf("hwnd_Parent:\t\t 0x%08X\n", hwnd_Parent);

	// You have to tell windows that you want to enable ActiveDesktop. 
	SendMessageTimeout(hwnd_Parent, 0x52C, NULL, NULL, SMTO_NORMAL, 500, NULL);

	HWND hwnd_me = FindWindow(NULL, "HTML5");
	//printf("\nhwnd_web:\t\t 0x%08X\n", hwnd_me);

	HWND dwndparent;
	HWND dwndviem = NULL;

	// Get a WorkerW windows
	dwndparent=FindWindowEx(0, 0, "WorkerW", "");
	//printf("dwndparent:\t\t 0x%08X\n", dwndparent);

	// Traversal query
	while((!dwndviem) && dwndparent)
	{
		dwndviem   = FindWindowEx(dwndparent, 0, "SHELLDLL_DefView", 0);
		dwndparent = FindWindowEx(0, dwndparent, "WorkerW", "");
		//printf("dwndparent:\t\t 0x%08X\n", dwndparent);
	}
	
	ShowWindow(dwndparent, 0);

	SetParent(hwnd_me, hwnd_Parent);
}

string ObjectToString(Local<Value> value) {
  String::Utf8Value utf8_value(value);
  return string(*utf8_value);
}

namespace winapi {
	using v8::Exception;
	using v8::FunctionCallbackInfo;
	using v8::Isolate;
	using v8::Local;
	using v8::Number;
	using v8::Object;
	using v8::String;
	using v8::Value;

	void SetDesktop(const FunctionCallbackInfo<Value>& args) {
		Isolate* isolate = args.GetIsolate();
 
		if (args[0]->IsString()) {
			Local<Value> arg1 = args[0];
			string rawStr = ObjectToString(arg1);
			printf("args[0] is %s\n", rawStr.c_str());
		}
		Call_SetDesktop();
	}

	void init(Local<Object> exports) {
		NODE_SET_METHOD(exports, "SetDesktop", SetDesktop);
	}
 
	NODE_MODULE(winapi, init);
}
