package com.qcacg;

import com.qcacg.CustomToastPackage;
import android.app.Application;

import com.facebook.react.ReactApplication;
import com.github.amarcruz.rntextsize.RNTextSizePackage;
import com.example.react_native_cn_tts.TTSPackage;



// import com.github.amarcruz.rntextsize.RNTextSizePackage;
// import io.github.airamrguez.RNMeasureTextPackage;

import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
// import io.realm.react.RealmReactPackage;
import com.rnfs.RNFSPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.horcrux.svg.SvgPackage;
// import org.pgsqlite.SQLitePluginPackage;
// import com.robinpowered.react.battery.DeviceBatteryPackage;


import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNTextSizePackage(),
            new TTSPackage(),
            // new RNTextSizePackage(),
            // new SQLitePluginPackage(),
          new RNFSPackage(),
          new CustomToastPackage(),
          new RNGestureHandlerPackage(),
          new SvgPackage()
            // new DeviceBatteryPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
