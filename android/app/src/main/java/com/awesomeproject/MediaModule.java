package com.awesomeproject;

import android.app.Activity;
import android.content.Context;
import android.database.Cursor;
import android.provider.MediaStore;
import android.widget.Toast;
import android.media.MediaScannerConnection;
import android.os.Environment;
import android.content.Intent;
import android.net.Uri;
import android.view.WindowManager;
import android.graphics.Typeface;
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
import java.text.DecimalFormat;

public class MediaModule extends ReactContextBaseJavaModule {
    public class Book{
        private String filePath;
        private String title;
        private String size;
        private String type;
        private String date;

        public String getDate() {
            return date;
        }

        public void setDate(String date) {
            this.date = date;
        }

        public String getFilePath() {
            return filePath;
        }

        public void setFilePath(String filePath) {
            this.filePath = filePath;
        }

        public String getSize() {
            return size;
        }

        public void setSize(String size) {
            this.size = size;
        }

        public String getTitle() {
            return title;
        }

        public String getType() {
            return type;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public void setType(String type) {
            this.type = type;
        }
        @Override
        public String toString() {
            return "{'filePath':'" + filePath + "', 'title':'" + title
                    + "', 'size':'" + size + "', 'type':'" + type + "', 'date':'"
                    + date + "'}";
        }
    }
    public MediaModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @Override
    public String getName() {
        return "GetMedia";
    }
    /*
     * 查询媒体库中所有Txt,Epub,Pdf文件
     * */
    @ReactMethod
    public void getAllBooks(final Callback successCallback) {

        Thread thread = new Thread(new Runnable(){
            @Override
            public void run(){
                ArrayList<Book> books = null;
                Activity currentActivity = getCurrentActivity();
                Cursor cursor = currentActivity.getContentResolver().query(
                        MediaStore.Files.getContentUri("external"),
                        new String[] {
                                MediaStore.Files.FileColumns.DATA,
                                MediaStore.Files.FileColumns.TITLE,
                                MediaStore.Files.FileColumns.SIZE,
                                MediaStore.Files.FileColumns.MIME_TYPE,
                                MediaStore.Files.FileColumns.DATE_MODIFIED},
                        MediaStore.Files.FileColumns.SIZE+">10240 and "+
                                MediaStore.Files.FileColumns.MIME_TYPE + "=? or "+
                                MediaStore.Files.FileColumns.MIME_TYPE + "=?",
                        new String[] { "text/plain", "application/pdf" }, null);

                books = new ArrayList<Book>();

                if (cursor.moveToFirst()) {

                    Book book = null;

                    do {
                        book = new Book();
                        // 文件路径
                        book.setFilePath(cursor.getString(0));

                        // 文件名
                        String path=cursor.getString(0);
                        String name="";
                        if(path.indexOf(".txt")!=-1){
                            name=cursor.getString(1)+".txt";
                        }else if(path.indexOf(".epub")!=-1){
                            name=cursor.getString(1)+".epub";
                        }else if(path.indexOf(".pdf")!=-1){
                            name=cursor.getString(1)+".pdf";
                        }
                        book.setTitle(name);
                        // 文件大小
                        int baseSize=cursor.getInt(2);
                        book.setSize(baseSize+"");
                        // 文件类型
                        book.setType(cursor.getString(3));
                        // 更新时间
                        book.setDate(cursor.getString(4));
                        books.add(book);
                    } while (cursor.moveToNext());

                    cursor.close();

                }else{
//            Toast.makeText(getReactApplicationContext(), "mei",Toast.LENGTH_SHORT).show();
                }
//        Toast.makeText(getReactApplicationContext(), books.toString(),Toast.LENGTH_SHORT).show();
                successCallback.invoke(books.toString());
            }
        });
        thread.start();
    }
    /*
    * 读取SD卡目录*/
    @ReactMethod
    public void getSDFiles(String path,Callback successCallback) {
        String sdPath=Environment.getExternalStorageDirectory().toString();
        if(path.equals("")){

            File file= Environment.getExternalStorageDirectory();
            File[] files = file.listFiles();// 读取
            String fileList=getFileName(files);
            successCallback.invoke(sdPath,fileList);
        }else{
            File file=new File(path);
            File[] files = file.listFiles();// 读取
            String fileList=getFileName(files);
            successCallback.invoke(sdPath,fileList);
        }
    }

    private String getFileName(File[] files) {
        String Items="";
        if (files != null) {// 先判断目录是否为空，否则会报空指针
            for (File file : files) {
                if (file.isDirectory()&&!file.isHidden()) {
                    File[] listFiles = file.listFiles();
                    if(listFiles.length>0){
                        Items += ("{'folder':{'fileName':'" + file.getName().toString() + "','filePath':'"+file.getPath().toString()+"'}},");
                    }
                } else {
                    Book book = null;
                    book = new Book();
                    String fileName = file.getName();
                    book.setTitle(fileName);
                    if((int)file.length()>10240) {
                        if (fileName.endsWith(".txt")) {
                            book.setSize(file.length() + "");
                            book.setDate(file.lastModified() + "");
                            book.setFilePath(file.getAbsolutePath());
                            book.setType("text/plain");
                            Items += ("{'file':" + book.toString() + "},");
                        } else if (fileName.endsWith(".epub")) {
                            book.setSize(file.length() + "");
                            book.setDate(file.lastModified() + "");
                            book.setFilePath(file.getAbsolutePath());
                            book.setType("text/plain");
                            Items += ("{'file':" + book.toString() + "},");
                        } else if (fileName.endsWith(".pdf")) {
                            book.setSize(file.length() + "");
                            book.setDate(file.lastModified() + "");
                            book.setFilePath(file.getAbsolutePath());
                            book.setType("application/pdf");
                            Items += ("{'file':" + book.toString() + "},");
                        }
                    }
                }
            }
        }
        return Items;
    }
    /*
    * 刷新媒体库*/
    @ReactMethod
    public void reshenMedia(String path){
        Activity currentActivity = getCurrentActivity();
        MediaScannerConnection.scanFile(currentActivity, new String[] { path }, null, null);
    }
    /*
    * 调节亮度
    * */
    @ReactMethod
    private void setLight(int brightness) {
        Activity context = getCurrentActivity();
        WindowManager.LayoutParams lp = context.getWindow().getAttributes();
        lp.screenBrightness = Float.valueOf(brightness) * (1f / 255f);
        context.getWindow().setAttributes(lp);
    }
    @ReactMethod
    private void getFontFile(String path1,String path2,String path3,Callback successCallback) {
        File file1=new File(path1);
        File file2=new File(path2);
        File file3=new File(path3);
        successCallback.invoke(file1.length()+"",file2.length()+"",file3.length()+"");
    }
}