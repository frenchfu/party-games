package tw.com.tradevan.petax.irxlot.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Clock;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.DefaultClock;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import tw.com.tradevan.petax.irxlot.config.IrxLotPath;

import javax.servlet.http.HttpServletRequest;
import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/6/28 下午 05:18
 */
@Log4j2
@Service
public class TokenService implements Serializable {


    @Autowired
    ObjectMapper objectMapper;

    private static final long serialVersionUID = -3301605591108950415L;
    private Clock clock = DefaultClock.INSTANCE;
    @Value("${jwt.secret}")
    private String secret;//= IrxLotPath.JWT_SECRET;
    private Long expiration = 60*60*24*1000L;//token 時效: 一天
    private Long flashExpiration = 30*60*1000L;//flash token 時效
    private Long validateCodeExpiration =  20 * 1000L; // 驗證碼時效: 20秒


    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public <T> T getUserFromToken(String token, Class<T> tClass) throws JsonProcessingException {
        return objectMapper.readValue(getClaimFromToken(token, Claims::getSubject), tClass);
    }

    public Date getIssuedAtDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getIssuedAt);
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }


    public Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(clock.now());
    }


    public String generateToken(String uuid) {
        Map<String, Object> claims = new HashMap<>();
        return doGenerateToken(claims, uuid);
    }

    public String generateFlashToken(String uuid) {
        Map<String, Object> claims = new HashMap<>();
        return doGenerateFlashToken(claims, uuid);
    }

    public String getAuthToken(HttpServletRequest request) {
        String authToken = null;

        final String requestHeader = request.getHeader("Authorization");

        if (requestHeader != null && requestHeader.startsWith("Bearer ")) {
            authToken = requestHeader.substring(7);
        }
        return authToken;
    }

    public Boolean validateToken(String token) {
        final Date created = getIssuedAtDateFromToken(token);
        return (!isTokenExpired(token));
    }

    //短時間 token
    private String doGenerateToken(Map<String, Object> claims, String subject) {
        final Date createdDate = clock.now();
        final Date expirationDate = calculateExpirationDate(createdDate, expiration);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(createdDate)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    //長時間 token
    private String doGenerateFlashToken(Map<String, Object> claims, String subject) {
        final Date createdDate = clock.now();
        final Date expirationDate = calculateExpirationDate(createdDate, flashExpiration);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(createdDate)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    private Date calculateExpirationDate(Date createdDate, long expiration) {
        return new Date(createdDate.getTime() + expiration);
    }

    public String refreshToken(String token) {
        final Date createdDate = clock.now();
        final Date expirationDate = calculateExpirationDate(createdDate, expiration);

        final Claims claims = getAllClaimsFromToken(token);
        claims.setIssuedAt(createdDate);
        claims.setExpiration(expirationDate);
        return Jwts.builder()
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    public String generateValidateCodeToken(String validateCode) {
        Map<String, Object> claims = new HashMap<>();
        return doGenerateValidateCodeToken(claims, validateCode);
    }

    //驗證碼 token
    private String doGenerateValidateCodeToken(Map<String, Object> claims, String subject) {
        final Date createdDate = clock.now();
        final Date expirationDate = calculateExpirationDate(createdDate, validateCodeExpiration);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(createdDate)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

}
