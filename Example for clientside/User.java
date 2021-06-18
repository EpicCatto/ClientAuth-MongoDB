package urclass;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.Scanner;

import yourHwidSystem;

public class User {
    public static String username;
    public static String uid;
    public static String hwid;
    public static String discordID;
    
    public static void getUserData() {
        try {
            final URL url = new URL("AuthServer/auth/user/getinfo/" + HWID.getHWID());
            final Scanner s = new Scanner(url.openStream());
            final String[] data = s.nextLine().split(":");
            username = data[0];
            uid = data[1];
            hwid = data[2];
            discordID = data[3];
        }catch(Exception e) {e.printStackTrace();}
    }

    
}
