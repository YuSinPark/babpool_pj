package ca.babpool.utils;

import lombok.RequiredArgsConstructor;
import org.apache.commons.mail.HtmlEmail;

@RequiredArgsConstructor
public class MailUtil {
    public void sendEmail(String memberId,String memberEmail, String pw) throws Exception {
        String hostSMTP="smtp.gmail.com";
        String hostSMTPid="gksmf35916@gmail.com";
        String hostSMTPpw="exlecdxdxsdccvbv";

        String fromEmail = "gksmf35916@gmail.com";
        String fromName = "밥풀";

        String subject = "배달 서비스 밥풀 임시 비밀번호 안내 이메일입니다";
        String msg = "";

        msg +="<div align='left'";
        msg +="<h3>";
        msg +=memberId + " 님의 임시 비밀번호입니다. <br>로그인 후 비밀번호를 변경해 주세요</h3>";
        msg +="<p>임시 비밀번호:";
        msg +=pw + "</p></div>";

        String mailRecipient = memberEmail;
        HtmlEmail mail = new HtmlEmail();
        mail.setDebug(true);
        mail.setCharset("utf-8");
        mail.setSSLOnConnect(true);
        mail.setHostName(hostSMTP);
        mail.setSmtpPort(587);
        mail.setAuthentication(hostSMTPid, hostSMTPpw);
        mail.setStartTLSEnabled(true);
        mail.addTo(mailRecipient, "utf-8");
        mail.setFrom(fromEmail, fromName, "utf-8");
        mail.setSubject(subject);
        mail.setHtmlMsg(msg);
        mail.send();

    }
}
