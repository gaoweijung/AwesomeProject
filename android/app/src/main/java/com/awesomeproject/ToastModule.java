package com.awesomeproject;

import android.widget.Toast;



import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import java.io.InputStreamReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.RandomAccessFile;
import java.io.BufferedReader;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.Scanner;

public class ToastModule extends ReactContextBaseJavaModule {

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";


    public ToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @Override
    public String getName() {
        return "ToastExample";
    }
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }
    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }

    /**
     * 根据行读取内容
     * @return
     */
    @ReactMethod
    public void Txt(int index,int all,String code,String filePath,Callback successCallback, Callback errorCallback) {
        File file = new File(filePath);
        String name = file.getName();
        int time =(int)file.lastModified();
        int filelength = all;
        int startIndex=index;
        Long fLen = file.length();
        try {
            if(fLen.intValue()-startIndex<filelength){
                filelength=fLen.intValue()-startIndex;
            }
            if(filelength>0){
                byte[] filecontent = new byte[filelength];
                FileInputStream in = new FileInputStream(file);
                in.skip(startIndex);
                in.read(filecontent);
                in.close();
                try {
                    successCallback.invoke(new String(filecontent, code));
                } catch (IOException e) {
                    errorCallback.invoke("文件不存在");
                }
            }else{
                errorCallback.invoke("读取出错",name,time);
            }
        }  catch (IOException e) {
            errorCallback.invoke("读取出错");
        }
    }
    /*
    *检测txt文件编码 */
    @ReactMethod
    public void checkCode(String filePath,Callback successCallback, Callback errorCallback) {
        String code = "gb2312";  //或GBK
        File file = new File(filePath);
        byte[] head = new byte[3];
        try{
            FileInputStream in = new FileInputStream(file);
            in.read(head);
            if (head[0] == -1 && head[1] == -2 )
                code = "UTF-16";
            else if (head[0] == -2 && head[1] == -1 )
                code = "Unicode";
            else if(head[0]==-17 && head[1]==-69 && head[2] ==-65)
                code = "UTF-8";
            in.close();
            successCallback.invoke(code);
        } catch (IOException e) {
            errorCallback.invoke("文件不存在");
        }
    }

}