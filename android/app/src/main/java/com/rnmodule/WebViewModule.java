package com.rnmodule;

import android.content.Context;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import android.text.Html;


import java.util.Random;

public class WebViewModule extends ReactContextBaseJavaModule {
    public WebViewModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "WebViewModule";
    }

    @ReactMethod
    public void convertHTML(String html, com.facebook.react.bridge.Callback callback) {
        CharSequence output = Html.fromHtml(html);
        String htmlOutput = output.toString();
        callback.invoke(htmlOutput);
    }
}
