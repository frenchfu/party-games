package tw.com.tradevan.petax.util;

import tw.com.fu.game.party.constant.exception.PartyGamesException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.*;

public class AESUtil {

	private AESUtil(){}

	private static final String KEY_AES = "AES";
	private static final SecureRandom secureRandom = new SecureRandom();

//	public static void main(String[] args) throws Exception {
//
//		System.out.println(decrypt(
//				"E5942310236AAAACFF1707547153B3E2CC8D3BBAF925B54FF497CE56E17A17079D1E66263E259EBCA49DE952974C3B02A220D690833BBC6037F53CDF3EB080D746D5EEFB1E3C633BA8B8805D2291AD202F2794429C8298ADD7CDA1B6FF78FBDAAE63688907EBD3BCF8729BB363C17C935BA160CC308CDB8E689804E6CA30CD91"
//				, "374Vbcm70SdPgxX4s2D370bmy68GhjTl","35494139434C5058"
//				));
//	}

	public static String encrypt(String src, String key, String iv) throws Exception {
		
		//加密前資料："+src);
		
		if (key == null || key.length() != 32) {
			throw new Exception("key must be 256 bits.");
		}
		byte[] raw = key.getBytes();
		SecretKeySpec skewSpec = new SecretKeySpec(raw, KEY_AES);
		Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
		IvParameterSpec ivs = new IvParameterSpec(iv.getBytes());
		cipher.init(Cipher.ENCRYPT_MODE, skewSpec, ivs);
		byte[] encrypted = cipher.doFinal(src.getBytes());
		//加密後資料："+byte2hex(encrypted));
		return byte2hex(encrypted);
	}

	public static String decrypt(String src, String key, String iv) throws PartyGamesException, NoSuchPaddingException, NoSuchAlgorithmException, InvalidAlgorithmParameterException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
		//解密前資料："+src);
		Security.setProperty("crypto.policy", "unlimited");
		if (key == null || key.length() != 32) {
			throw new PartyGamesException("-9","key must be 256 bits.");
		}
		byte[] raw = key.getBytes();
		SecretKeySpec skewSpec = new SecretKeySpec(raw, KEY_AES);
		Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
		IvParameterSpec ivs = new IvParameterSpec(iv.getBytes());
		cipher.init(Cipher.DECRYPT_MODE, skewSpec, ivs);
		byte[] encrypted1 = hex2byte(src);
		byte[] original = cipher.doFinal(encrypted1);
		String originalString = new String(original);
		//解密後資料： originalString;
		return originalString;
	}

	public static byte[] hex2byte(String strhex) {
		if (strhex == null) {
			return null;
		}
		int l = strhex.length();
		if (l % 2 == 1) {
			return null;
		}
		byte[] b = new byte[l / 2];
		for (int i = 0; i != l / 2; i++) {
			b[i] = (byte) Integer.parseInt(strhex.substring(i * 2, i * 2 + 2), 16);
		}
		return b;
	}

	public static String byte2hex(byte[] b) {
		StringBuilder hs = new StringBuilder();
		String stmp = "";
		for (byte value : b) {
			stmp = (Integer.toHexString(value & 0XFF));
			if (stmp.length() == 1) {
				hs.append("0").append(stmp);
			} else {
				hs.append(stmp);
			}
		}
		return hs.toString().toUpperCase();
	}
	
	public static String genIv() {
        //亂數產出 16 bytes 長雜湊值  
		String salt = genRandom(16).toUpperCase();
          
        //Byte to Hex 取前 16 bytes 為向量值   
		return AESUtil.byte2hex(salt.getBytes()).substring(0,16);

	}

	/**
	 * 產生不重複隨機數，含數字及大小寫
	 *
	 * @return
	 */
	public static String genRandom(int length) {
		StringBuilder uid = new StringBuilder();

		for (int i = 0; i < length; i++) {
			//產生0-2 3位隨機數
			int type = secureRandom.nextInt(3);
			switch (type) {
				case 0:
					//0-9的隨機數
					uid.append(secureRandom.nextInt(10));
					break;
				case 1:
					//ASCII在65-90之間隨機大寫
					uid.append((char) (secureRandom.nextInt(25) + 65));
					break;
				case 2:
					//ASCII在97-122隨機小寫
					uid.append((char) (secureRandom.nextInt(25) + 97));
					break;
				default:
					break;
			}
		}
		return uid.toString();
	}

}
