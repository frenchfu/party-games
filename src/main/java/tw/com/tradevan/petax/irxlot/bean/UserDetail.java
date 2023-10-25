package tw.com.tradevan.petax.irxlot.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/6/28 下午 05:41
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Generated
public class UserDetail implements UserDetails {

    private String account;
    private String authType;

    /**
     * 許可權列表
     */
    @JsonProperty("permissions")
    private List<String> permissionList;

    @JsonIgnore
    @Override
    public String getPassword() {
        return null;
    }

    @JsonIgnore
    @Override
    public String getUsername() {
        return account;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return true;
    }

    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> grantedAuthorityList = new ArrayList<>();
        if (CollectionUtils.isNotEmpty(permissionList)) {
            for (String permission: permissionList) {
                grantedAuthorityList.add(new SimpleGrantedAuthority("ROLE_" + permission));
            }
        }
        return grantedAuthorityList;
    }

}
